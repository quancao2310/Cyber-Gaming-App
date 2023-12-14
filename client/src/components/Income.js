import { useEffect, useState } from 'react';
import axios from 'axios';


function Income() {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 text-center">
                    <h3>Doanh thu</h3>
                </div>
                <div className="col">
                    <label htmlFor="startDatePicker">Từ ngày:</label>
                    <input
                        type="date"
                        id="startDatePicker"
                        className="form-control"
                        value={startDate}
                        onChange={handleStartDateChange}
                    />
                </div>
                <div className="col">
                    <label htmlFor="endDatePicker">Đến ngày:</label>
                    <input
                        type="date"
                        id="endDatePicker"
                        className="form-control"
                        value={endDate}
                        onChange={handleEndDateChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default Income;