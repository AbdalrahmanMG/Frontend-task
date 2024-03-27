import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Posts() {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                let res = await axios.get('https://first-posts-backend.onrender.com/api/v1/posts')
                setPosts(res.data)
                setIsLoading(false)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [])


    return (
        <>
            {isLoading ? (
                <div className='h-96 flex justify-center align-middle items-center'>
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            ) : (
                posts.map(p => (
                    <div key={p.id} className="card md:card-side bg-base-100 shadow-xl sm:flex-col flex md:flex-row my-10">
                        <figure className="w-fit md:w-2/6 h-fit aspect-w-16 aspect-h-9"><img src={p.image} className='object-cover w-full h-full' alt={p.title} /></figure>
                        <div className="card-body">
                            <h2 className="card-title m-auto">{p.title}</h2>
                            <p>{p.description}</p>
                        </div>
                    </div>
                ))
            )}
        </>
    );
}
