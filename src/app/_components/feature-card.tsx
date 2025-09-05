"use client";

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function FeatureCard({ icon: Icon, title, description, index, onClick }: { icon: React.ElementType, title: string, description: string, index: number, onClick?: () => void }) {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const isClickable = !!onClick;

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-full"
            onClick={onClick}
        >
            <Card className={`h-full transition-all duration-300 rounded-2xl ${isClickable ? 'cursor-pointer hover:border-primary/40 hover:shadow-xl hover:-translate-y-2' : ''}`}>
                <CardHeader className="items-center text-center">
                    <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-[20px] mb-3 shadow-lg">
                        <Icon className={`h-8 w-8 text-white`} />
                    </div>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center px-6 pb-6">
                    <p className="text-muted-foreground">{description}</p>
                </CardContent>
            </Card>
        </motion.div>
    );
}
