import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Task } from '../types/task';

/**
 * TaskContextType - Definiše "oblik" podataka koje Context deli
 * 
 * Ovo je kao ugovor koji kaže:
 * "Svaka komponenta koja koristi ovaj Context će dobiti ove podatke i funkcije"
 */
interface TaskContextType {
  state: { tasks: Task[] };  // Lista svih taskova
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;  // Funkcija za dodavanje novog taska
  updateTask: (id: string, updates: Partial<Task>) => void;  // Funkcija za izmenu postojećeg taska
  deleteTask: (id: string) => void;  // Funkcija za brisanje taska
  toggleStatus: (id: string) => void;  // Funkcija za promenu statusa (pending ↔ completed)
  clearCompletedTasks: () => void; // Funkcija za brisanje svih zavrsenih taskova
  duplicateTask: (id: string) => void;
  exportTasks: () => void;   // Preuzimanje taskova kao JSON fajl
  importTasks: (jsonString: string) => void;  // Učitavanje taskova iz JSON stringa
  archiveTask: (id: string) => void;
  restoreTask: (id: string) => void;
}

/**
 * Kreiranje Context-a - "Kabl" kroz koji će teći podaci
 * 
 * - createContext() kreira prazan "kanal" za komunikaciju
 * - Početna vrednost je undefined (biće postavljena u Provider-u)
 * - Sve komponente mogu da se "priključe" na ovaj kanal
 */
const TaskContext = createContext<TaskContextType | undefined>(undefined);

/**
 * Učitavanje taskova iz localStorage-a
 * 
 * localStorage = Trajna memorija browsera (ostaje nakon refresh-a)
 * 
 * Proces:
 * 1. Proveri da li smo u browseru (window postoji)
 * 2. Pročitaj 'tasks' ključ iz localStorage-a
 * 3. Ako ne postoji → vrati prazan array
 * 4. Ako postoji → pretvori JSON string u JavaScript objekte
 * 5. Date polja (createdAt, dueDate) pretvori iz string-a u Date objekte
 */
const loadTasks = (): Task[] => {
  // Server-side rendering provera (Next.js, itd.)
  if (typeof window === 'undefined') return [];
  
  try {
    // Pokušaj pročitati taskove
    const item = window.localStorage.getItem('tasks');
    if (!item) return [];  // Ako nema ništa sačuvano
    
    // Pretvori JSON string → JavaScript objekti
    const tasks = JSON.parse(item);
    
    // JSON čuva date kao string, moramo vratiti u Date objekte
    return tasks.map((task: any) => ({
      ...task,
      createdAt: new Date(task.createdAt),  // String → Date
      dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
    }));
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    return [];  // Ako je greška, vrati prazan niz
  }
};

/**
 * TaskProvider - "Elektrana" koja proizvodi i deli podatke
 * 
 * Ovo je komponenta koja:
 * 1. Drži state (tasks u memoriji)
 * 2. Definiše funkcije za rad sa taskovima
 * 3. Deli sve to sa child komponentama kroz Context
 * 
 * children = sve komponente unutar <TaskProvider>...</TaskProvider>
 */
export const TaskProvider = ({ children }: { children: ReactNode }) => {
  // STATE - Glavni izvor podataka (tasks lista u RAM-u)
  // Početna vrednost: učitaj iz localStorage-a
  const [tasks, setTasks] = useState<Task[]>(loadTasks);

  /**
   * useEffect - Automatsko čuvanje u localStorage
   * 
   * Izvršava se SVAKI PUT kada se tasks promeni
   * Dependency array [tasks] = "prati tasks"
   * 
   * Tok:
   * 1. Korisnik doda/obriše/izmeni task
   * 2. tasks state se promeni
   * 3. useEffect detektuje promenu
   * 4. Automatski sačuva u localStorage
   */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // Pretvori JavaScript objekte → JSON string i sačuvaj
        window.localStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error('Error saving tasks to localStorage:', error);
      }
    }
  }, [tasks]);  // ← Izvršava se kada se tasks promeni

  /**
   * addTask - Dodavanje novog taska
   * 
   * Prima: podatke o tasku (bez id i createdAt)
   * Radi:
   *   1. Kreira kompletan task objekat (dodaje id i createdAt)
   *   2. Dodaje ga u tasks array
   *   3. useEffect automatski čuva u localStorage
   */
  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,  // Raspakovuje sve što je prosleđeno (title, description, itd.)
      id: Date.now().toString(),  // Generisanje jedinstvenog ID-a
      createdAt: new Date(),  // Trenutni datum/vreme
    };
    // setTasks sa funkcijom - bezbedno za concurrent updates
    setTasks(prev => [newTask, ...prev]);  // Dodaj novi task na pocetak liste
  };

  /**
   * updateTask - Izmena postojećeg taska
   * 
   * Prima: id taska i izmene (npr. {title: "Novo"})
   * Radi: Pronađe task po id-u i primeni izmene
   */
  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, ...updates } : task
        // ↑ Ako je ID jednak → spoji stari task sa izmenama
        // ↑ Ako nije → vrati task nepromenjenog
      )
    );
  };

  /**
   * deleteTask - Brisanje taska
   * 
   * Prima: id taska koji treba obrisati
   * Radi: Filtrira sve taskove osim onog sa datim id-om
   */
  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    // filter() kreira novi niz bez taskova čiji je id jednak prosleđenom
  };

  /**
   * toggleStatus - Promeni status (pending ↔ completed)
   * 
   * Prima: id taska
   * Radi: Pronađe task i promeni mu status na suprotno
   */
  const toggleStatus = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, status: task.status === 'pending' ? 'completed' : 'pending' }
          //                   ↑ Ternary operator: ako je pending → completed, ako je completed → pending
          : task
      )
    );
  };

  const clearCompletedTasks = () => {
    setTasks(prev => prev.filter(task => task.status !== 'completed'))
  };

  const duplicateTask = (id: string) => {
    // Ažuriramo tasks state koristeći funkcionalnu formu setState
    setTasks(prev => {
      // Pronađi task koji želimo da dupliciramo po ID-u
      const taskToDuplicate = prev.find(task => task.id === id);
      
      // Ako task ne postoji, vrati originalni niz bez promena
      if (!taskToDuplicate) return prev;
      
      // Kreiraj novi task objekat
      const newTask: Task = {
        ...taskToDuplicate,              // Kopiraj SVA polja iz originalnog task-a (description, priority, category, dueDate, itd.)
        id: Date.now().toString(),       // Generiši NOVI jedinstveni ID (timestamp)
        title: `Copy of ${taskToDuplicate.title}`, // Dodaj "Copy of" prefix da se vidi da je kopija
        createdAt: new Date(),           // Postavi NOVO vreme kreiranja (sada)
        status: 'pending',               // Resetuj status na 'pending' (čak i ako je original bio 'completed')
      };
      
      // Vrati novi niz sa svim starim task-ovima + novi duplicirani task na kraju
      return [newTask, ...prev];
    })
  };

  /**
   * exportTasks - Preuzimanje taskova kao JSON fajl
   *
   * Korak po korak:
   * 1. tasks (niz objekata) → pretvori u JSON string (null, 2 = lepo formatiran sa uvlačenjem)
   * 2. Blob = "paket" podataka u memoriji sa tipom application/json (browser zna šta je)
   * 3. createObjectURL = kreira privremeni URL koji pokazuje na taj Blob (kao link ka fajlu u RAM-u)
   * 4. Kreira se <a> element, postavi mu href na taj URL i download atribut (ime fajla pri preuzimanju)
   * 5. programski klik na link → browser preuzima fajl
   * 6. revokeObjectURL = oslobodi URL (čisti memoriju, link više ne važi)
   */
  const exportTasks = () => {
    const tasksJson = JSON.stringify(tasks, null, 2);
    const blob = new Blob([tasksJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tasks-${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /**
   * importTasks - Učitavanje taskova iz JSON stringa (npr. sadržaj preuzetog/uploadovanog fajla)
   *
   * Korak po korak:
   * 1. JSON.parse = string → JavaScript objekti (niz taskova)
   * 2. .map() = za svaki task iz uvezenog niza:
   *    - ...task = kopiraj sva polja
   *    - createdAt i dueDate u JSON-u su stringovi → new Date() ih pretvara u prave Date objekte
   * 3. setTasks() = zameni trenutnu listu taskova u state-u sa uvezenom listom
   * 4. try/catch = ako JSON nije validan (parse baci grešku), uhvati je i prikaži alert
   */
  const importTasks = (jsonString: string) => {
    try {
      const importedTasks = JSON.parse(jsonString);
      setTasks(importedTasks.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
      })));
    } catch (error) {
      alert('Invalid JSON file');
    }
  };

  const archiveTask = (id: string) => {
    updateTask(id, { archived: true });
  };

  const restoreTask = (id: string) => {
    updateTask(id, { archived: false });
  };

  /**
   * value objekat - "Pakujemo" sve u jedan objekat
   * 
   * Ovo je ono što će sve komponente dobiti kada pozovu useTaskContext()
   * Sadrži: podatke (tasks) i funkcije za rad sa njima
   */
  const value: TaskContextType = {
    state: { tasks },  // Trenutna lista taskova
    addTask,           // Funkcija za dodavanje
    updateTask,        // Funkcija za izmenu
    deleteTask,        // Funkcija za brisanje
    toggleStatus,      // Funkcija za toggle statusa
    clearCompletedTasks, // Funkcija za brisanje svih zavrsenih taskova,
    duplicateTask,       // Funkcija za dupliciranje taska
    exportTasks,         // Preuzimanje taskova kao JSON
    importTasks,        // Učitavanje taskova iz JSON stringa
    archiveTask,        // Funkcija za arhiviranje taska
    restoreTask,        // Funkcija za vraćanje archived taska u aktivnu listu
  };

  /**
   * Provider - Komponenta koja "emituje" podatke
   * 
   * - Wrap-uje sve child komponente
   * - Prosleđuje "value" kroz Context
   * - Sve komponente unutar mogu pristupiti podacima
   */
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

/**
 * useTaskContext - Custom Hook za pristup Context-u
 * 
 * Ovo je "utičnica" - komponente se priključuju ovde
 * 
 * Korišćenje u komponenti:
 *   const { state, addTask, deleteTask } = useTaskContext();
 * 
 * Error handling:
 *   Baca grešku ako komponenta nije unutar <TaskProvider>
 *   (kao da pokušaš priključiti uređaj bez struje)
 */
export const useTaskContext = () => {
  // Pokušaj da uzmeš podatke iz Context-a
  const context = useContext(TaskContext);
  
  // Proveri da li je komponenta unutar TaskProvider-a
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
    // Ovo znači: "Mora da wrap-uješ komponentu sa <TaskProvider>"
  }
  
  // Vrati podatke i funkcije
  return context;
};
