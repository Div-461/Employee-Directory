import React from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function Paginations({ count, page, color, variant, onChange, className }) {
    return (
        <>
            <Stack spacing={2} className={className}>
                <Pagination
                    count={count}
                    page={page}
                    color={color}
                    variant={variant}
                    showFirstButton
                    showLastButton
                    onChange={onChange}
                />
            </Stack>
        </>
    )
}

export default Paginations;
