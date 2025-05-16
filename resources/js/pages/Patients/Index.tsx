import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Check } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Patients',
        href: '/patients',
    },
];

interface Patients {
    id: number;
    name: string;
    age: number;
    gender: string;
    birthday: string;
    contact: string;
    address: string;
}

interface PageProps {
    flash: {
        message?: string;
    };
    patients: Patients[]
}

export default function Index() {

    const { patients, flash } = (usePage().props as unknown as PageProps);

    const { processing, delete: destroy } = useForm();

    const handleDelete = (id: number, name: string) => {
        if(confirm(`Are you sure you want to delete ${name}?`)) {
            destroy(route('patients.destroy', id));
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Patients" />
            <div className="m-4">
                <Link href={route('patients.create')}>
                    <Button>Add New Patient</Button>
                </Link>
            </div>
            <div className="m-4">
                <div>
                    {flash.message && (
                        <Alert>
                            <Check className="h-4 w-4" />
                            <AlertTitle>Notification!</AlertTitle>
                            <AlertDescription>{flash.message}</AlertDescription>
                        </Alert>
                    )}
                </div>
            </div>
            {patients.length > 0 && (
                <div className="m-4">
                    <Table>
                        <TableCaption className='align-bottom'>Patient Records</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Age</TableHead>
                                <TableHead>Gender</TableHead>
                                <TableHead>Birthday</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {patients.map((patient) => (
                                <TableRow>
                                    <TableCell className="font-medium">{patient.id}</TableCell>
                                    <TableCell>{patient.name}</TableCell>
                                    <TableCell>{patient.age}</TableCell>
                                    <TableCell>{patient.gender}</TableCell>
                                    <TableCell>{patient.birthday}</TableCell>
                                    <TableCell>{patient.contact}</TableCell>
                                    <TableCell>{patient.address}</TableCell>
                                    <TableCell className="text-center space-x-2">
                                        <Link href={route('patients.edit', patient.id)}><Button className='bg-slate-600 hover:bg-yellow-700'>Edit</Button></Link>
                                        <Button disabled={processing} onClick={() => handleDelete(patient.id, patient.name)} className='bg-red-500 hover:bg-red-700'>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </AppLayout>
    );
}
