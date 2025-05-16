import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CircleAlert } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Add New Patient',
        href: '/patients/create',
    },
];

export default function Index() {

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        age: '',
        gender: '',
        birthday: '',
        contact: '',
        address: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('patients.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add New Patient" />
            <div className='w-8/12 p-4'>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    {/* Display Error */}

                    {Object.keys(errors).length > 0 &&(
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

                    <div className='gap-1.5'>
                        <Label htmlFor='patient name'>Name</Label>
                        <Input placeholder='Patient Name' value={data.name} onChange={(e) => setData('name', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor='patient age'>Age</Label>
                        <Input placeholder='Age' value={data.age} onChange={(e) => setData('age', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor='patient gender'>Gender</Label>
                        <Input placeholder='Gender' value={data.gender} onChange={(e) => setData('gender', e.target.value)}></Input>
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
                    <div className='gap-1.5'>
                        <Label htmlFor='patient contact'>Contact</Label>
                        <Input placeholder='Contact' value={data.contact} onChange={(e) => setData('contact', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor='patient address'>Address</Label>
                        <Textarea placeholder='Address' value={data.address} onChange={(e) => setData('address', e.target.value)}/>
                    </div>
                    <Button disabled={processing} type='submit'>Add Patient</Button>
                </form>
            </div>
        </AppLayout>
    );
}
