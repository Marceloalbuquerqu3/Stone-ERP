
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { ChevronLeft, ChevronRight, Package } from 'lucide-react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCompany } from '@/contexts/CompanyContext';

const ProductionCalendar = () => {
  const { company } = useCompany();
  const [jobs, setJobs] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    if (company) {
      const allJobs = JSON.parse(localStorage.getItem('production_jobs') || '[]');
      setJobs(allJobs.filter(j => j.company_id === company.id));
    }
  }, [company]);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  const getJobsForDay = (day) => {
    return jobs.filter(job => {
      const jobDate = new Date(job.deliveryDate);
      return jobDate.getDate() === day && 
             jobDate.getMonth() === currentDate.getMonth() && 
             jobDate.getFullYear() === currentDate.getFullYear();
    });
  };

  const renderCalendarDays = () => {
    const days = [];
    const today = new Date();

    // Empty cells for days before the 1st
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-32 bg-stone-50/50 border border-stone-100"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayJobs = getJobsForDay(day);
      const isToday = day === today.getDate() && 
                      currentDate.getMonth() === today.getMonth() && 
                      currentDate.getFullYear() === today.getFullYear();

      days.push(
        <div key={day} className={`h-32 border border-stone-200 p-2 overflow-y-auto ${isToday ? 'bg-blue-50/50' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-1">
             <span className={`text-sm font-semibold h-7 w-7 flex items-center justify-center rounded-full ${isToday ? 'bg-blue-600 text-white' : 'text-stone-700'}`}>
                {day}
             </span>
          </div>
          <div className="space-y-1">
            {dayJobs.map(job => (
              <div key={job.id} className="text-xs p-1.5 bg-blue-100 text-blue-800 rounded border border-blue-200 truncate cursor-pointer hover:bg-blue-200 transition-colors" title={`${job.project} - ${job.client}`}>
                {job.project}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="flex h-screen bg-stone-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <Helmet><title>Calendário de Produção - Stone ERP</title></Helmet>
          
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-stone-900">Calendário de Produção</h1>
            <div className="flex items-center gap-4">
               <Button variant="outline" onClick={prevMonth} size="icon"><ChevronLeft className="h-4 w-4" /></Button>
               <span className="text-lg font-semibold w-32 text-center">
                 {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
               </span>
               <Button variant="outline" onClick={nextMonth} size="icon"><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </div>

          <Card className="rounded-xl border-stone-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-stone-50 border-b border-stone-200 p-4">
              <div className="grid grid-cols-7 text-center">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                  <div key={day} className="text-sm font-semibold text-stone-500 uppercase tracking-wider">{day}</div>
                ))}
              </div>
            </CardHeader>
            <CardContent className="p-0">
               <div className="grid grid-cols-7">
                  {renderCalendarDays()}
               </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default ProductionCalendar;
