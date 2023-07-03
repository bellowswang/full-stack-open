const Filter = ( {newFilter, handleFilterChange} ) => {
    return (
        <form>
            find countries <input
                value={newFilter}
                onChange={handleFilterChange}
            />
        </form>
    )
}

export default Filter