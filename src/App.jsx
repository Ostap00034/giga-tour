import React, { useRef, useState } from 'react'
import { Pannellum } from 'pannellum-react'

import scenes from './data/scenes.json'

function App() {
	const [currentScene, setCurrentScene] = useState(0)

	const panImage = useRef(null)

	return (
		<div className='w-full h-screen flex flex-row'>
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
