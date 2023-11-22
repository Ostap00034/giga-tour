import React, { useEffect, useState } from 'react'
import axios from 'axios'

const VisitQueries = () => {
	const [data, setData] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const data = await axios.get('http://localhost:4200/api/visitquery/')
			console.log(data.data)
			setData(data.data)
		}

		fetchData()
	}, [])

	return (
		<div>
			{data.length > 0
				? data.map((query, index) => (
						<div key={index}>
							<div className=''>
								<div className=''>ФИО</div>
								<div className=''>{query.fio}</div>
							</div>
							<div className=''>
								<div className=''>Кому</div>
								<div className=''>{query.to}</div>
							</div>
						</div>
				  ))
				: 'Заявок нет.'}
		</div>
	)
}

export default VisitQueries
