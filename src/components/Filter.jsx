import React, { useState } from 'react';
import Input from './Input';
import Select from './Select';
import '../css/filter.css';
import '../css/resetFilter.css';
import ResetFilter from './ResetFilter';

function Filter({ search, setSearch, onDepartmentChange, departmentOptions, selectedDepartment, optionSortings, onSortingChange, selectedSorting, resetFilterHandler }) {
    return (
        <>
            <div className="row">
                <div className="col-12 col-md-3 mb-3 mb-md-0">
                    <Input
                        type={'search'}
                        value={search}
                        name={'search'}
                        id={'search'}
                        onChange={setSearch}
                        className={'form-control'}
                        placeholder={'Search by name, position...'}
                    />
                </div>
                <div className="col-12 col-md-3 d-flex align-items-center mb-3 mb-md-0">
                    <Select
                        id={'sort'}
                        className={'form-select'}
                        onChange={onSortingChange}
                        options={optionSortings}
                        text={'Sort by...'}
                        value={selectedSorting}
                    />
                </div>
                <div className="col-12 col-md-3 d-flex align-items-center">
                    <Select
                        className={'form-select'}
                        onChange={onDepartmentChange}
                        options={departmentOptions}
                        id={'departments'}
                        value={selectedDepartment}
                        text={'Filter by departments'}
                    />
                </div>
                <div className="col-12 col-md-2 d-flex align-items-center justify-content-center">
                    <ResetFilter onClick={resetFilterHandler} />
                </div>
            </div>
        </>
    );
}

export default Filter;
