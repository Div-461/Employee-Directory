import React, { useEffect, useState } from 'react';
import EmployeeCard from './EmployeeCard';
import Button from './Button';
import Filter from './Filter';
import Paginations from './Pagination';
import Select from './Select';
import { fetchEmpData } from '../services/apiServices';
import '../css/dashboard.css';

export default function Dashboard() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedLetter, setSelectedLetter] = useState('All');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedSorting, setSelectedSorting] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(8);

    //array that display the buttons 
    const buttonsArray = [
        'All', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ];
    //array that display inside the dropdown
    const sortingArray = [
        'First Name', 'Email', 'Departments'
    ];
    //array that display inside the item per page
    const itemPerPageArray = [8, 12, 16, 32];
    //function that fetch the data  
    const fetchData = async () => {
        try {
            const result = await fetchEmpData();
            const datas = await result.json();
            setData(datas);
        } catch (error) {
            console.log('Failed to fetch employee data.', error.message);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    //function that sort the data in ascending order
    const sortBy = (data, criterion) => {
        try {
            return [...data].sort((a, b) => {
                switch (criterion) {
                    case 'Departments':
                        if (a.department === null) return 1;
                        if (b.department === null) return -1;
                        return a.department.localeCompare(b.department);
                    case 'First Name':
                        if (a.displayName === null) return 1;
                        if (b.displayName === null) return -1;
                        return a.displayName.localeCompare(b.displayName);
                    case 'Email':
                        if (a.mail === null) return 1;
                        if (b.mail === null) return -1;
                        return a.mail.localeCompare(b.mail);
                    default:
                        return 0;
                }
            });
        } catch (error) {
            console.log('Failed to sort employee data.', error.message);
            return data;
        }

    };
    //get the new page if the filteredData more than zero
    useEffect(() => {
        try {
            if (filteredData.length > 0) {
                const newCurrentPage = Math.min(currentPage, Math.ceil(filteredData.length / recordsPerPage));
                setCurrentPage(newCurrentPage);
            }
        } catch (error) {
            console.log('Failed to calculate the current page.', error.message);
        }
    }, [filteredData, recordsPerPage]);
    //function that filter the records by search
    const filterBySearch = (data, search) => {
        try {
            if (search.trim() === '') return data;
            const lowerCaseSearch = search.trim().toLowerCase();
            return data.filter(emp => {
                const displayName = emp.displayName ? emp.displayName.toLowerCase() : '';
                const jobTitle = emp.jobTitle ? emp.jobTitle.toLowerCase() : '';
                return displayName.includes(lowerCaseSearch) || jobTitle.includes(lowerCaseSearch);
            });
        } catch (error) {
            console.log('Failed to filter the while searching..', error.message);
        }
    };
    //function that filter the records by letters
    const filterByLetter = (data, selectedLetter) => {
        try {
            if (!selectedLetter || selectedLetter === 'All') return data;
            return data.filter(emp => emp.displayName.startsWith(selectedLetter));
        } catch (error) {
            console.log('Failed to filter the records by characters', error.message);
        }
    };
    //function that filter the records by departments
    const filterByDepartment = (data, selectedDepartment) => {
        try {
            if (!selectedDepartment) return data;
            return data.filter(emp => emp.department === selectedDepartment);
        } catch (error) {
            console.log('Failed to filter the records by departments', error.message);
        }
    };
    //function that sort the records in ascendind order
    const sortData = (data, selectedSorting) => {
        try {
            if (!selectedSorting) return data;
            return sortBy(data, selectedSorting);
        } catch (error) {
            console.log('Failed to sort the records...', error.message);
        }
    };
    //filter the records
    useEffect(() => {
        try {
            let result = data;
            result = filterBySearch(result, search);
            result = filterByLetter(result, selectedLetter);
            result = filterByDepartment(result, selectedDepartment);
            result = sortData(result, selectedSorting);
            setFilteredData(result);
            setCurrentPage(1);
        } catch (error) {
            console.log('Failed to filter employee data.', error.message);
        }
    }, [search, selectedLetter, selectedDepartment, selectedSorting, data]);
    //handle the page change 
    const handlePageChange = (event, page) => {
        try {
            setCurrentPage(page);
        } catch (error) {
            console.error('Failed to change page.', error.message);
        }
    };
    //calculate the pages for pagination
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);
    //get the total pages 
    const totalPages = Math.ceil(filteredData.length / recordsPerPage);
    //handle that perform the filter by character
    const handleClick = (item) => {
        try {
            if (item == 'All') {
                handleResetFilters();
                setSelectedLetter(item);
            } else {
                setSelectedLetter(item);
            }
        } catch (error) {
            console.log('Failed to filter by character', error.message);
        }
    };
    //function that filter by departments
    const handleDepartmentChange = (department) => {
        try {
            setSelectedDepartment(department);
        } catch (error) {
            console.log('Failed to filter by departments', error.message);
        }
    };
    //function that sort the data 
    const handleSoringChange = (sorting) => {
        try {
            setSelectedSorting(sorting);
        } catch (error) {
            console.log('Failed to sort the data..', error.message);
        }
    };
    //function that remove the filters
    const handleResetFilters = () => {
        try {
            setSearch("");
            setSelectedDepartment('');
            setSelectedSorting('');
            setRecordsPerPage(8);
            setCurrentPage(1);
        } catch (error) {
            console.log('Failed to reset the filters', error.message);
        }
    };
    //get all the departments from the data
    const departments = [...new Set(data.map(emp => emp.department).filter(dep => dep !== null))];
    //conditionally render the className inside the footer
    const footerClassName = currentRecords.length <= 4 ? 'fixed-bottom' : '';
    return (
        <>
            <div className="container">
                <div className='row'>
                    <div className='col-12 d-flex justify-content-between align-items-center my-2'>
                        <div className='d-flex flex-wrap'>
                            {
                                buttonsArray.map((item, index) => (
                                    <Button
                                        key={index}
                                        text={item}
                                        onClick={() => handleClick(item)}
                                        className={`mx-1 ${item === selectedLetter ? 'bg-primary text-white' : 'bg-light text-black'} filterByCharacter`}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className='filter-row my-1'>
                    <div className='filter-container'>
                        <Filter
                            search={search} setSearch={setSearch}
                            onDepartmentChange={handleDepartmentChange}
                            departmentOptions={departments}
                            selectedDepartment={selectedDepartment}
                            optionSortings={sortingArray}
                            onSortingChange={handleSoringChange}
                            selectedSorting={selectedSorting}
                            resetFilterHandler={handleResetFilters}
                        />
                    </div>
                </div>
                <ul className="row list-unstyled g-2 d-flex justify-content-start my-1">
                    {
                        currentRecords.length > 0 ? currentRecords.map((item, index) => (
                            <li className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
                                <EmployeeCard
                                    displayName={item.displayName}
                                    jobTitle={item.jobTitle}
                                    department={item.department}
                                    email={item.mail}
                                    manager={item.manager}
                                    ext={item.businessPhones[0]}
                                    location={item.officeLocation}
                                />
                            </li>
                        ))
                            : data.length > 0 ? <p className='text-center'>No employees found...</p> : <p className='text-center'>Loading Data...</p>
                    }
                </ul>
            </div>
            <footer className={`container ${footerClassName}`}>
                {totalPages > 1 && (
                    <div className='d-flex justify-content-start my-3'>
                        <Select
                            id={'itemPerPage'}
                            className={'form-select'}
                            style={{ width: '70px' }}
                            options={itemPerPageArray}
                            value={recordsPerPage}
                            onChange={setRecordsPerPage}
                        />
                        <Paginations className={'mx-2'} variant={'outlined'}
                            count={totalPages}
                            page={currentPage}
                            color={'secondary'}
                            onChange={handlePageChange}
                        />
                    </div>
                )}
            </footer>
        </>
    );
}
