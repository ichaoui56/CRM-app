import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import useTickets from '../../../hooks/useTicket';
import styled from 'styled-components';

const customStyles = {
    headCells: {
        style: {
            backgroundColor: '#F5F7F8',
            fontSize: '16px',
            fontWeight: 'bold',
            color: 'gray', 
        },
    },

    cells: {
        style: {
            backgroundColor: '#F9F7F8',
            fontSize: '14px',
        
        },
    },
};

const Title = styled.h2`
    font-size: 30px;
    color: black;
`;

const TableWrapper = styled.div`
    border-radius: 7px;
    overflow: hidden;
`;

const TicketsTable = () => {
    const { tickets, loading, error } = useTickets();
    const [search, setSearch] = useState('');
    const [filteredTickets, setFilteredTickets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setFilteredTickets(tickets);
    }, [tickets]);

    useEffect(() => {
        if (!tickets || tickets.length === 0) {
            setFilteredTickets([]);
            return;
        }

        const searchTerm = search.toLowerCase();

        const filteredResult = tickets.filter(ticket => {
            const ticketId = ticket.id ? ticket.id.toLowerCase() : '';
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
            const status = ticket.status ? ticket.status.toLowerCase() : '';
            const problemDescription = ticket.problem_description ? ticket.problem_description.toLowerCase() : '';

            return (
                ticketId.includes(searchTerm) ||
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
                status.includes(searchTerm) ||
                problemDescription.includes(searchTerm)
            );
        });

        setFilteredTickets(filteredResult);
    }, [search, tickets]);
    const columns = [
        {
            name: 'Ticket ID',
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: 'Technician Name',
            selector: (row) => row.technician ? `${row.technician.first_name} ${row.technician.last_name}` : '',
            sortable: true,
        },
        {
            name: 'Client Name',
            selector: (row) => row.contact ? row.contact.name : '',
            sortable: true,
            
        },
        {
            name: 'Contact Name',
            selector: (row) => row.contact ? row.contact.name : '',
            sortable: true,
        },
        {
            name: 'City',
            selector: (row) => row.contact ? row.contact.city : '',
            sortable: true,
        },
        {
            name: 'Tag No',
            selector: (row) => row.laptop ? row.laptop.tag : '',
            sortable: true,
        },
        {
            name: 'Status',
            selector: (row) => row.status,
            sortable: true,
        },
        {
            name: 'Service Type',
            selector: (row) => row.service_type,
            sortable: true,
        },
    ];
    const handleRowClick = (row) => {
        navigate(`/dashboard/tickets/ticket-details/${row.id}`); 
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <TableWrapper>
            <DataTable
                title={<Title>Ticket List</Title>}
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
                        className='w-25 mb-5 form-control'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                }
                subHeaderAlign='left'
                customStyles={customStyles}
                onSort={(column, direction) => {
                    // Handle sorting if needed
                }}
                conditionalRowStyles={[ // Conditional row styles for hover effect
                    {
                        when: row => true,
                        style: {
                            backgroundColor: '#EBF5FF',
                            '&:hover': {
                                cursor: 'pointer',
                                backgroundColor: '#C2E0FF',
                            },
                        },
                    },
                ]}
                onRowClicked={handleRowClick} // Handle row click event
            />
        </TableWrapper>
    );
};

export default TicketsTable;
