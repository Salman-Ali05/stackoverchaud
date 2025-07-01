import { useState, useMemo } from 'react';
import { ClassroomData, ClassroomStats } from '../types/classroom';

const initialClassrooms: ClassroomData[] = [
  {
    id: '1',
    name: 'Salle A',
    letter: 'A',
    isOccupied: false,
    capacity: 30,
    position: [-6, 0, -3],
  },
  {
    id: '2',
    name: 'Salle B',
    letter: 'B',
    isOccupied: false,
    capacity: 25,
    position: [0, 0, -3],
  },
  {
    id: '3',
    name: 'Salle C',
    letter: 'C',
    isOccupied: true,
    capacity: 35,
    position: [6, 0, -3],
  },
  {
    id: '4',
    name: 'Salle D',
    letter: 'D',
    isOccupied: false,
    capacity: 40,
    position: [-6, 0, 3],
  },
  {
    id: '5',
    name: 'Salle E',
    letter: 'E',
    isOccupied: true,
    capacity: 20,
    position: [0, 0, 3],
  },
  {
    id: '6',
    name: 'Salle F',
    letter: 'F',
    isOccupied: false,
    capacity: 45,
    position: [6, 0, 3],
  },
];

export const useClassrooms = () => {
  const [classrooms, setClassrooms] = useState<ClassroomData[]>(initialClassrooms);

  const toggleClassroom = (id: string) => {
    setClassrooms(prev =>
      prev.map(classroom =>
        classroom.id === id
          ? { ...classroom, isOccupied: !classroom.isOccupied }
          : classroom
      )
    );
  };

  const stats: ClassroomStats = useMemo(() => {
    const total = classrooms.length;
    const occupied = classrooms.filter(c => c.isOccupied).length;
    const available = total - occupied;
    const occupancyRate = Math.round((occupied / total) * 100);

    return {
      total,
      occupied,
      available,
      occupancyRate,
    };
  }, [classrooms]);

  return {
    classrooms,
    stats,
    toggleClassroom,
  };
};