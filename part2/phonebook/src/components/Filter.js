const Filter = (props) => {
    return (
        <form>
            filter shown with <input
                value={props.newFilter}
                onChange={props.handleFilterChange}
            />
        </form>
    )
}

export default Filter