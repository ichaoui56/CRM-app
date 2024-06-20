import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import useTickets from '../../../hooks/useTicket';

const TicketsTable = () => {
    const { tickets, loading, error } = useTickets();
    const [search, setSearch] = useState('');
    const [filteredTickets, setFilteredTickets] = useState([]);

    useEffect(() => {
        // Initially set filteredTickets to all tickets
        setFilteredTickets(tickets);
    }, [tickets]);

    useEffect(() => {
        if (!tickets || tickets.length === 0) {
            setFilteredTickets([]);
            return;
        }

        const searchTerm = search.toLowerCase();

        const filteredResult = tickets.filter(ticket => {
            // Ensure properties are defined before accessing them
            const clientName = (ticket.contact && ticket.contact.name) ? ticket.contact.name.toLowerCase() : '';
            const clientAddress = (ticket.contact && ticket.contact.city) ? ticket.contact.city.toLowerCase() : '';
            const clientPhone = (ticket.contact && ticket.contact.phone) ? ticket.contact.phone.toLowerCase() : '';
            const contactEmail = (ticket.contact && ticket.contact.email) ? ticket.contact.email.toLowerCase() : '';
            const clientCountry = (ticket.contact && ticket.contact.country) ? ticket.contact.country.toLowerCase() : '';
            const modelName = (ticket.laptop && ticket.laptop.model_name) ? ticket.laptop.model_name.toLowerCase() : '';
            const tagNo = (ticket.laptop && ticket.laptop.tag) ? ticket.laptop.tag.toLowerCase() : '';
            const modelNo = (ticket.laptop && ticket.laptop.model_number) ? ticket.laptop.model_number.toLowerCase() : '';
            const technicianName = (ticket.technician && ticket.technician.firstName && ticket.technician.lastName) ? `${ticket.technician.firstName} ${ticket.technician.lastName}`.toLowerCase() : '';
            const serviceType = ticket.service_type ? ticket.service_type.toLowerCase() : '';
            const problemDescription = ticket.problem_description ? ticket.problem_description.toLowerCase() : '';

            return (
                clientName.includes(searchTerm) ||
                clientAddress.includes(searchTerm) ||
                clientPhone.includes(searchTerm) ||
                contactEmail.includes(searchTerm) ||
                clientCountry.includes(searchTerm) ||
                modelName.includes(searchTerm) ||
                tagNo.includes(searchTerm) ||
                modelNo.includes(searchTerm) ||
                technicianName.includes(searchTerm) ||
                serviceType.includes(searchTerm) ||
                problemDescription.includes(searchTerm)
            );
        });

        setFilteredTickets(filteredResult);
    }, [search, tickets]);

    const columns = [
        {
            name: 'Client Name',
            selector: (row) => row.contact ? row.contact.name : '',
            sortable: true,
        },
        {
            name: 'Client Address',
            selector: (row) => row.contact ? row.contact.city : '',
            sortable: true,
        },
        {
            name: 'Client Phone',
            selector: (row) => row.contact ? row.contact.phone : '',
            sortable: true,
        },
        {
            name: 'Contact Email',
            selector: (row) => row.contact ? row.contact.email : '',
            sortable: true,
        },
        {
            name: 'Client Country',
            selector: (row) => row.contact ? row.contact.country : '',
            sortable: true,
        },
        {
            name: 'Model Name',
            selector: (row) => row.laptop ? row.laptop.model_name : '',
            sortable: true,
        },
        {
            name: 'Tag No',
            selector: (row) => row.laptop ? row.laptop.tag : '',
            sortable: true,
        },
        {
            name: 'Model No',
            selector: (row) => row.laptop ? row.laptop.model_number : '',
            sortable: true,
        },
        {
            name: 'Technician Name',
            selector: (row) => row.technician ? `${row.technician.first_name} ${row.technician.last_name}` : '',
            sortable: true,
        },
        {
            name: 'Service Type',
            selector: (row) => row.service_type,
            sortable: true,
        },
        {
            name: 'Problem Description',
            selector: (row) => row.problem_description,
            sortable: true,
        },
    ];

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <DataTable
            title='Ticket List'
            columns={columns}
            data={filteredTickets}
            pagination
            fixedHeader
            fixedHeaderScrollHeight='450px'
            selectableRowsHighlight
            highlightOnHover
            actions={<button className='btn btn-info btn-sm'>Export</button>}
            subHeader
            subHeaderComponent={
                <input
                    type='text'
                    placeholder='Search Here'
                    className='w-25 form-control'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            }
            subHeaderAlign='left'
            onSort={(column, direction) => {
                // Handle sorting if needed
            }}
        />
    );
};

export default TicketsTable;
