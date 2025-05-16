import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { CalendarIcon, CircleAlert } from 'lucide-react';

interface Patient {
    id: number;
    name: string;
    age: number;
    gender: string;
    birthday: string;
    contact: string;
    address: string;
}

interface Props {
    patient: Patient;
}

export default function Edit({ patient }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: patient.name,
        age: patient.age,
        gender: patient.gender,
        birthday: patient.birthday,
        contact: patient.contact,
        address: patient.address,
    });

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('patients.update', patient.id));
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Edit Patient', href: `patients/${patient.id}/edit` }]}>
            <Head title="Update Patient" />
            <div className="w-8/12 p-4">
                <form onSubmit={handleUpdate} className="space-y-4">
                    {/* Display Error */}

                    {Object.keys(errors).length > 0 && (
                        <Alert>
                            <CircleAlert className="h-4 w-4" />
                            <AlertTitle>Error!</AlertTitle>
                            <AlertDescription>
                                <ul>
                                    {Object.entries(errors).map(([key, message]) => (
                                        <li key={key}>{message as string}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="gap-1.5">
                        <Label htmlFor="patient name">Name</Label>
                        <Input placeholder="Patient Name" value={data.name} onChange={(e) => setData('name', e.target.value)}></Input>
                    </div>
                    <div className="gap-1.5">
                        <Label htmlFor="patient age">Age</Label>
                        <Input placeholder="Age" value={data.age} onChange={(e) => setData('age', Number(e.target.value))}></Input>
                    </div>
                    <div className="gap-1.5">
                        <Label htmlFor="patient gender">Gender</Label>
                        <Input placeholder="Gender" value={data.gender} onChange={(e) => setData('gender', e.target.value)}></Input>
                    </div>
                    <div className="gap-1.5">
                        <Label htmlFor="patient-birthday">Birthday</Label>
                        <div className="flex items-center gap-2">
                            <Input
                                id="patient-birthday"
                                type="date"
                                className="w-full"
                                value={data.birthday || ''}
                                max={new Date().toISOString().split('T')[0]}
                                min="1900-01-01"
                                onChange={(e) => setData('birthday', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="gap-1.5">
                        <Label htmlFor="patient contact">Contact</Label>
                        <Input placeholder="Contact" value={data.contact} onChange={(e) => setData('contact', e.target.value)}></Input>
                    </div>
                    <div className="gap-1.5">
                        <Label htmlFor="patient address">Address</Label>
                        <Textarea placeholder="Address" value={data.address} onChange={(e) => setData('address', e.target.value)} />
                    </div>
                    <Button disabled={processing} type="submit">
                        Update Patient
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
