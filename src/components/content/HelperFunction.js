// Returns an input field a given key, value pair
export function DisplayInputField(data_entry) {
    const columns = Object.keys(data_entry)  // Get column names

    return columns.map(column_name => {
        let value = data_entry[column_name]
        let label = `${column_name} ${data_entry['ID']}`
        let rows = 1

        // Increase the row size when the length of text exceeds 90 characters
        if (value.length > 90) rows = 6

        return (
            <div className='mb-3' key={label}>
                <label form={label} className='form-label'>{column_name}</label>
                <textarea id={label} className='form-control' defaultValue={value} rows={rows}/>
            </div>
        )
    })
}

// Return a collection of input fields for each section
export function DisplayEntryBlock(input_fields, section_headers) {
    return input_fields.map((data_entry, idx) => {
        // Unique key for div
        const label = `${section_headers} ${idx}`

        // Check for blank section headers
        if (section_headers === '') return DisplayInputField(data_entry)

        return (
            <div key={label}>
                <h4>{label}</h4>
                {DisplayInputField(data_entry)}
            </div>
        )
    })
}

// Returns an array of table column names
export function GetColumnNames(data) {
    return data.map(data_entry => {
        return Object.keys(data_entry[0]).slice(1)  // Only need to use the first entry to get the keys
    })
}

// Returns an array of DOM element values
export function GetPageData(event, table_columns) {
    return table_columns.map(column_names => {
        return column_names.map(label => {
            // Get the values from each input field
            const input_block_dom = event.target.querySelectorAll(`[id^=${label}]`)

            // Check for date column
            if (label === 'DATE_STARTED' || label === 'DATE_ENDED') {
                return Array.from(input_block_dom, input_dom => input_dom.value.slice(0, 10))
            }

            return Array.from(input_block_dom, input_dom => input_dom.value)  // Make the node list iterable
        })
    })
}

// Send page data to server
export async function FormatPageData(raw_page_data, table_headers, table_columns, path) {
    raw_page_data.map(async (section, idx) => {

        // Get the values for each entry within each section
        // Format payload for server request
        for (let id = 0; id < section[0].length; id++) {
            const values = section.map(input_block => {
                return input_block[id]
            })

            // Push data to array
            let table_name = table_headers[idx]
            let cols = table_columns[idx]

            await FetchRequest(id, values, cols, table_name, 'PATCH', path)
        }
    })
}

// Send an api request using fetch
export async function FetchRequest(id, values, cols, table_name, method, path) {
    await fetch(path, {
        method: method,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            table: table_name,
            id: id,
            values: values,
            cols: cols
        })
    })
}

// Clear table
async function ClearRequest(table_name, path) {
    await fetch(path, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            table: table_name
        })
    })
}

// Render