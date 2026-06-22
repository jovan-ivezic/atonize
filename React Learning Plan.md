React Learning Plan - Praktični Zadaci (Revidirano)
Pregled Pojednostavljivanja
Kod je pojednostavljen po DRY principima sa ~200 linija manje koda (28% smanjenje):

Šta je promenjeno:
Context: useReducer → useState (jednostavnije za učenje)
Validacija: Real-time validacija → jednostavna validacija na submit
Optimizacije: Uklonjeni memo, useMemo, useCallback (nisu potrebni za osnove)
Hooks: Obrisani useTasks.ts i useLocalStorage.ts (nepotrebni wrapperi)
Wrapper funkcije: Direktni pozivi umesto nepotrebnih wrappera
Trenutna struktura fajlova:
src/
├── types/task.ts                    # TypeScript tipovi
├── components/
│   ├── TaskManager.tsx              # Glavna komponenta (157 linija)
│   ├── TaskForm.tsx                 # Forma (175 linija)
│   └── TaskItem.tsx                 # Prikaz taska (113 linija)
├── context/
│   └── TaskContext.tsx              # Context sa useState (102 linije)
└── pages/
    └── Tasks.tsx                    # Tasks stranica
---

Dan 1: Razumevanje React Osnova
Zadatak 1.1: Prouči TypeScript tipove
Cilj: Razumeti kako se definišu tipovi

Šta radiš:

Otvori src/types/task.ts
Pročitaj Priority, Status, i Task interfejs
ZADATAK: Dodaj novi tip:
export type Category = 'work' | 'personal' | 'shopping' | 'other';
ZADATAK: Promeni u Task interfejsu:
// Staro:
category?: string;

// Novo:
category?: Category;
Šta učiš:

Union types ('low' | 'medium' | 'high')
Interfejsi u TypeScript-u
Optional properties (?)
---

Zadatak 1.2: Analiziraj useState u komponenti
Cilj: Razumeti state management

Šta radiš:

Otvori src/components/TaskManager.tsx
Pronađi useState hook-ove (linija 10-11):
const [showForm, setShowForm] = useState(false);
const [editingTask, setEditingTask] = useState<Task | null>(null);
ZADATAK: Dodaj novi state za prikaz statistike:
const [showStatistics, setShowStatistics] = useState(true);
ZADATAK: Napravi dugme za toggle:
<button onClick={() => setShowStatistics(!showStatistics)}>
  {showStatistics ? 'Hide Statistics' : 'Show Statistics'}
</button>
ZADATAK: Prikaži statistiku samo ako je showStatistics === true
Šta učiš:

Kako useState čuva i menja stanje
Destructuring iz useState
Conditional rendering sa && i ternary operatorom
---

Zadatak 1.3: Razumej Props između komponenti
Cilj: Razumeti kako se prosleđuju podaci

Šta radiš:

Otvori src/components/TaskItem.tsx
Pogledaj TaskItemProps interfejs (linija 4-9)
ZADATAK: Dodaj novi optional prop:
interface TaskItemProps {
  task: Task;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit?: (task: Task) => void;
  showDetails?: boolean; // DODAJ OVO
}
ZADATAK: Koristi prop za conditional rendering:
{showDetails && task.description && (
  <p className="text-gray-600 mb-2">
    {task.description}
  </p>
)}
ZADATAK: Prosleđi prop iz TaskManager.tsx:
<TaskItem
  task={task}
  onToggleStatus={toggleStatus}
  onDelete={deleteTask}
  onEdit={handleEdit}
  showDetails={true}
/>
Šta učiš:

Props interfejsi
Proslеđivanje podataka iz roditelja u dete
Optional props sa ?
Conditional rendering
---

Dan 2: Forme i Event Handling
Zadatak 2.1: Prouči Controlled Components
Cilj: Razumeti kako forme rade u React-u

Šta radiš:

Otvori src/components/TaskForm.tsx
Pronađi useState za form polja (linija 12-16):
const [title, setTitle] = useState('');
const [description, setDescription] = useState('');
const [priority, setPriority] = useState<Priority>('medium');
const [category, setCategory] = useState('');
const [dueDate, setDueDate] = useState('');
ZADATAK: Dodaj novo polje - "Notes" (opcioni notes):
const [notes, setNotes] = useState('');
ZADATAK: Dodaj textarea u formu:
<div>
  <label htmlFor="notes">Notes</label>
  <textarea
    id="notes"
    value={notes}
    onChange={(e) => setNotes(e.target.value)}
    placeholder="Additional notes (optional)"
  />
</div>
ZADATAK: Dodaj notes u Task interfejs i u taskData objekat
Šta učiš:

Controlled components (value + onChange)
Event handling
Kako React drži sinhronizaciju state-a i input-a
---

Zadatak 2.2: Implementiraj jednostavnu validaciju
Cilj: Validacija formi na submit

Šta radiš:

U src/components/TaskForm.tsx, pogledaj handleSubmit (linija 33-52)
Trenutna validacija je:
if (title.trim().length < 3) {
  alert('Title must be at least 3 characters');
  return;
}
ZADATAK: Dodaj validaciju za due date:
if (dueDate) {
  const selectedDate = new Date(dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (selectedDate < today) {
    alert('Due date cannot be in the past');
    return;
  }
}
ZADATAK: Dodaj validaciju za description:
if (description.length > 500) {
  alert('Description must be less than 500 characters');
  return;
}
BONUS: Prikaži broj preostalih karaktera ispod description textarea
Šta učiš:

Validacija na submit
Date manipulation u JavaScript-u
Alert vs custom error poruke
---

Zadatak 2.3: useEffect za populaciju forme
Cilj: Razumeti useEffect hook

Šta radiš:

U src/components/TaskForm.tsx, prouči useEffect (linija 18-31):
useEffect(() => {
  if (initialTask) {
    setTitle(initialTask.title);
    setDescription(initialTask.description);
    // ...
  }
}, [initialTask]);
ZADATAK: Dodaj console.log da vidiš kada se useEffect izvršava:
useEffect(() => {
  console.log('useEffect triggered, initialTask:', initialTask);
  if (initialTask) {
    // ...
  }
}, [initialTask]);
ZADATAK: Eksperimentiši - šta se dešava ako:
Ukloniš dependency array [initialTask]?
Staviš prazan array []?
Dodaš još dependency-ja?
Šta učiš:

useEffect za side effects
Dependency array
Kada se useEffect izvršava
---

Dan 3: Context API i State Management
Zadatak 3.1: Analiziraj Context API
Cilj: Razumeti globalni state

Šta radiš:

Otvori src/context/TaskContext.tsx
Prouči strukturu:
createContext (linija 14)
TaskProvider komponenta (linija 38)
useTaskContext custom hook (linija 95)
ZADATAK: Dodaj novu funkciju u Context - clearCompletedTasks:
// U TaskContextType interfejs (linija 5-11):
interface TaskContextType {
  // ... existing
  clearCompletedTasks: () => void; // DODAJ
}

// U TaskProvider (linija 38-92):
const clearCompletedTasks = () => {
  setTasks(prev => prev.filter(task => task.status !== 'completed'));
};

// U value objektu (linija 83-89):
const value: TaskContextType = {
  state: { tasks },
  addTask,
  updateTask,
  deleteTask,
  toggleStatus,
  clearCompletedTasks, // DODAJ
};
ZADATAK: Koristi funkciju u TaskManager.tsx:
const { state, addTask, updateTask, deleteTask, toggleStatus, clearCompletedTasks } = useTaskContext();

// Dodaj dugme:
<button onClick={clearCompletedTasks}>
  Clear Completed ({completedCount})
</button>
Šta učiš:

createContext i Provider pattern
Kako se state deli između komponenti
Custom hook za pristup Context-u
---

Zadatak 3.2: Proširi useState logiku u Context-u
Cilj: Razumeti state updates sa funkcijama

Šta radiš:

U src/context/TaskContext.tsx, prouči kako se koristi setTasks sa funkcijom:
// Primer (linija 58):
setTasks(prev => [...prev, newTask]);

// Umesto:
setTasks([...tasks, newTask]); // LOŠE - može dovesti do problema
ZADATAK: Dodaj funkciju duplicateTask:
const duplicateTask = (id: string) => {
  setTasks(prev => {
    const taskToDuplicate = prev.find(task => task.id === id);
    if (!taskToDuplicate) return prev;
    
    const newTask: Task = {
      ...taskToDuplicate,
      id: Date.now().toString(),
      title: `Copy of ${taskToDuplicate.title}`,
      createdAt: new Date(),
      status: 'pending',
    };
    
    return [...prev, newTask];
  });
};
ZADATAK: Dodaj u interfejs i value objekat
ZADATAK: Dodaj "Duplicate" dugme u TaskItem.tsx
Šta učiš:

Functional updates sa setState
Zašto koristiti prev => ... umesto direktnog pristupa
Immutability u React-u
---

Zadatak 3.3: localStorage Perzistencija
Cilj: Razumeti localStorage i useEffect

Šta radiš:

U src/context/TaskContext.tsx, prouči:
loadTasks funkciju (linija 17-35)
useEffect za save (linija 42-50)
ZADATAK: Dodaj funkcionalnost za export/import:
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
ZADATAK: Dodaj dugmad u TaskManager.tsx:
<button onClick={exportTasks}>Export Tasks</button>

<input
  type="file"
  accept=".json"
  onChange={(e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        importTasks(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  }}
/>
Šta učiš:

localStorage API
JSON serializacija/deserializacija
File API u browseru
Date objekti u JSON-u
---

Dan 4: Naprednije Funkcionalnosti
Zadatak 4.1: Filtriranje taskova
Cilj: Implementirati filtriranje po prioritetu

Šta radiš:

U src/components/TaskManager.tsx, dodaj state za filter:
const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');
ZADATAK: Filtriraj taskove pre prikaza:
const filteredTasks = priorityFilter === 'all'
  ? tasks
  : tasks.filter(task => task.priority === priorityFilter);
ZADATAK: Dodaj select za filtriranje:
<select
  value={priorityFilter}
  onChange={(e) => setPriorityFilter(e.target.value as Priority | 'all')}
>
  <option value="all">All Priorities</option>
  <option value="low">Low</option>
  <option value="medium">Medium</option>
  <option value="high">High</option>
</select>
ZADATAK: Koristi filteredTasks umesto tasks u map funkciji
Šta učiš:

Filter funkcije u JavaScript-u
Conditional rendering
Kombinovanje filter i map
---

Zadatak 4.2: Sortiranje taskova
Cilj: Implementirati sortiranje

Šta radiš:

Dodaj state za sort:
type SortOption = 'date-desc' | 'date-asc' | 'priority' | 'title';
const [sortBy, setSortBy] = useState<SortOption>('date-desc');
ZADATAK: Kreiraj funkciju za sortiranje:
const getSortedTasks = (tasks: Task[]) => {
  const sorted = [...tasks]; // Copy array
  
  switch (sortBy) {
    case 'date-desc':
      return sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    case 'date-asc':
      return sorted.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    case 'priority':
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return sorted.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    case 'title':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sorted;
  }
};
ZADATAK: Kombinuj filtriranje i sortiranje:
const displayTasks = getSortedTasks(filteredTasks);
Šta učiš:

Array sort funkcija
Immutability (kopiranje array-a pre sortiranja)
Kombinovanje više transformacija
---

Zadatak 4.3: Search/Pretraga
Cilj: Implementirati pretragu taskova

Šta radiš:

Dodaj state:
const [searchQuery, setSearchQuery] = useState('');
ZADATAK: Dodaj search input:
<input
  type="text"
  placeholder="Search tasks..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>
ZADATAK: Filtriraj taskove po search query-ju:
const searchedTasks = displayTasks.filter(task =>
  task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  task.description.toLowerCase().includes(searchQuery.toLowerCase())
);
BONUS: Dodaj highlight za pronađene reči u task prikazu
Šta učiš:

String metode (toLowerCase, includes)
Kombinovanje više filtera
Debouncing (opciono - za optimizaciju)
---

Dan 5: Dodatne Funkcionalnosti
Zadatak 5.1: Archive funkcionalnost
Cilj: Dodati mogućnost arhiviranja

Šta radiš:

ZADATAK: Dodaj archived u Task interfejs:
export interface Task {
  // ... existing
  archived?: boolean;
}
ZADATAK: Dodaj funkciju u Context:
const archiveTask = (id: string) => {
  setTasks(prev =>
    prev.map(task =>
      task.id === id ? { ...task, archived: true } : task
    )
  );
};
ZADATAK: Dodaj toggle za prikaz archived:
const [showArchived, setShowArchived] = useState(false);

// Filter taskove:
const visibleTasks = showArchived
  ? tasks
  : tasks.filter(task => !task.archived);
Šta učiš:

Proširenje interfejsa
Toggle stanja
Optional properties
---

Zadatak 5.2: "Due Soon" notifikacije
Cilj: Prikazati taskove koji su uskoro due

Šta radiš:

ZADATAK: Kreiraj funkciju:
const getDueSoonTasks = () => {
  const threeDaysFromNow = new Date();
  threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
  
  return tasks.filter(task => {
    if (!task.dueDate || task.status === 'completed') return false;
    
    const dueDate = new Date(task.dueDate);
    return dueDate <= threeDaysFromNow && dueDate >= new Date();
  });
};
ZADATAK: Prikaži u posebnoj sekciji:
{getDueSoonTasks().length > 0 && (
  <div className="bg-yellow-50 p-4 rounded-lg">
    <h3>Due Soon ({getDueSoonTasks().length})</h3>
    {getDueSoonTasks().map(task => (
      <TaskItem key={task.id} task={task} />
    ))}
  </div>
)}
Šta učiš:

Date manipulation
Kombinovanje filter uslova
Conditional rendering sekcija
---

Zadatak 5.3: Task Categories sa boji
Cilj: Vizuelno razlikovati kategorije

Šta radiš:

ZADATAK: Kreiraj color mapping:
const categoryColors: Record<string, string> = {
  work: 'bg-blue-100 text-blue-800',
  personal: 'bg-purple-100 text-purple-800',
  shopping: 'bg-green-100 text-green-800',
  other: 'bg-gray-100 text-gray-800',
};
ZADATAK: Koristi u TaskItem.tsx:
{task.category && (
  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
    categoryColors[task.category] || 'bg-gray-100 text-gray-800'
  }`}>
    {task.category}
  </span>
)}
ZADATAK: Dodaj select sa predefinisanim kategorijama u formi
Šta učiš:

Record type u TypeScript-u
Dynamic styling
Fallback vrednosti
---

Kako Koristiti Plan
Proces za svaki zadatak:
Čitaj - pažljivo pročitaj šta treba da uradiš
Prouči - pogledaj postojeći kod sličan onome što treba da implementiraš
Implementiraj - pokušaj sam, bez pomoći
Testiraj - proveri da li radi
Pitaj - ako zapneš, pitaj za pomoć ili objašnjenje
Refaktorši - razmisli kako bi moglo biti bolje
Saveti:
Ne žuri - razumevanje je važnije od brzine
Eksperimentiši - probaj da menjaš kod i vidiš šta se dešava
Greške su deo procesa - učenje kroz debugging je najkorisnije
Pitaj za objašnjenja - bolje je pitati nego nagađati
Resursi:
React Dokumentacija
TypeScript + React Cheatsheet
MDN - Array Methods
MDN - Date Objects
---

Napomene o DRY Principima
Kroz ovaj plan učiš:

Don't Repeat Yourself - izbegavanje duplikacije
Keep It Simple - jednostavna rešenja su bolja
Single Responsibility - svaka funkcija/komponenta ima jednu svrhu
Composition over Complexity - gradi kompleksno iz jednostavnih delova
Trenutni kod je primer DRY principa u praksi - jednostavan, čitljiv, lako održiv.



Za kasnije roadmap:

Sada - završi task menadžer (učvršćivanje React + TypeScript osnova)
Sledeći korak - nadogradi task menadžer sa Supabase
Podaci se čuvaju u bazi (ne samo u state-u)
Dodaj login/registraciju
Svaki korisnik vidi samo svoje taskove
Ovo ti daje praksu sa autentifikacijom i bazom na manjem projektu
Onda kreni sa barter platformom
Pređi na Next.js (App Router)
Iskoristi sve što si naučio
Dodaj upload slika, chat, ponude...
