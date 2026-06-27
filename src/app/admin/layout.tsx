import { ThemeProvider } from '@/tailadmin/context/ThemeContext';
import { SidebarProvider } from '@/tailadmin/context/SidebarContext';
import "@/tailadmin/tailadmin.css";
import TailAdminWrapper from '@/tailadmin/layout/TailAdminWrapper';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ThemeProvider>
          <SidebarProvider>
            <TailAdminWrapper>
              {children}
            </TailAdminWrapper>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
