
"use client";

import type { Skill } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface SkillsProps {
  skills: Skill[];
}

export function Skills({ skills }: SkillsProps) {
  const [progress, setProgress] = useState<{[key: string]: number}>({});
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (isOpen) {
      const timers = skills.map(skill => {
        return setTimeout(() => {
          setProgress(prev => ({ ...prev, [skill.name]: skill.level }));
        }, 200);
      });

      return () => {
        timers.forEach(clearTimeout);
      };
    }
  }, [skills, isOpen]);

  return (
    <section className="py-12 sm:py-16">
       <Card className="max-w-4xl mx-auto">
        <Accordion type="single" collapsible defaultValue="item-1" onValueChange={(value) => setIsOpen(!!value)}>
          <AccordionItem value="item-1" className="border-b-0">
            <AccordionTrigger className="p-6 hover:no-underline">
              <CardHeader className="p-0 flex-1">
                <CardTitle className="text-3xl font-bold text-center font-headline">My Skills</CardTitle>
              </CardHeader>
            </AccordionTrigger>
            <AccordionContent>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 p-6 pt-0">
                  {skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-semibold text-card-foreground">{skill.name}</h3>
                        <span className="text-sm font-mono text-muted-foreground">{progress[skill.name] || 0}%</span>
                      </div>
                      <Progress value={progress[skill.name] || 0} className="h-3" />
                    </div>
                  ))}
                </CardContent>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </section>
  );
}
