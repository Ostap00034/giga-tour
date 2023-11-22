import React, { useRef, useState } from 'react'
import { Pannellum } from 'pannellum-react'

import cn from 'clsx'

import scenes from './data/scenes.json'

function App() {
	const [currentScene, setCurrentScene] = useState(0)
	const [windows, setWindows] = useState([false, false])

	const panImage = useRef(null)

	const handleOpenModal = number => {
		const newArray = [...windows]

		newArray[number] = !newArray[number]

		console.log(newArray)

		setWindows(newArray)
	}

	return (
		<div className='w-full h-screen flex flex-row'>
			<div
				className={cn(
					'min-w-[30vw] h-[500px]',
					windows[0] ? 'visible opacity-100' : 'invisible opacity-0',
					'transition-all z-[1] bg-slate-600 duration-300 ease-in-out fixed w-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
				)}
			></div>
			<div
				className={cn(
					'min-w-[30vw] h-[500px]',
					windows[1] ? 'visible opacity-100' : 'invisible opacity-0',
					'transition-all z-[1] bg-blue-600 duration-300 ease-in-out fixed w-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
				)}
			></div>
			<div className='w-[20vw] h-screen bg-red-600 text-black text-xl flex flex-col'>
				{scenes[currentScene].sceneName}
				<div className=''>
					<div className=''>Основатель</div>
					<div className=''>
						{scenes[currentScene].creator || 'Остутствует'}
					</div>
				</div>
				<div className=''>
					<div className=''>Дата начала резиденства</div>
					<div className=''>
						{scenes[currentScene].createdAt || 'Остутствует'}
					</div>
				</div>
				<div className=''>
					<div className=''>Сфера деятельности</div>
					<div className=''>
						{scenes[currentScene].fieldOfActivity || 'Остутствует'}
					</div>
				</div>
				<div className=''>
					<div className=''>Информация</div>
					<div className=''>{scenes[currentScene].info || 'Остутствует'}</div>
				</div>
				<div className=''>
					<div className=''>Услуга</div>
					<div className=''>
						{scenes[currentScene].service || 'Остутствует'}
					</div>
				</div>
				<button
					onClick={() => {
						handleOpenModal(0)
					}}
					className=''
				>
					Отправить заявку на очный визит
				</button>
				<button
					onClick={() => {
						handleOpenModal(1)
					}}
					className=''
				>
					Отправить заявку на прохождение практики/стажировки
				</button>
			</div>
			<div className=''>
				<Pannellum
					ref={panImage}
					width='80vw'
					height='100vh'
					image={scenes[currentScene].scenePanoImg + '?resize=800%2C600'}
					pitch={scenes[currentScene].init.yaw}
					yaw={scenes[currentScene].init.pitch}
					hfov={100}
					showControls={true}
					onError={err => {
						console.log('Error', err)
					}}
					draggable
					autoLoad
					showZoomCtrl={false}
					onMouseup={event => {
						console.log(
							'pitch: ' +
								panImage.current.getViewer().mouseEventToCoords(event)[0]
						)
						console.log(
							'yaw: ' +
								panImage.current.getViewer().mouseEventToCoords(event)[1]
						)
					}}
				>
					{scenes[currentScene].hotSpotsArr.map((hotSpot, index) => {
						return (
							<Pannellum.Hotspot
								key={`${currentScene}-${index}`}
								type='custom'
								pitch={hotSpot.pitch}
								yaw={hotSpot.yaw}
								handleClick={() => setCurrentScene(hotSpot.transition)}
								name='INFO'
							/>
						)
					})}
				</Pannellum>
			</div>
		</div>
	)
}

export default App
