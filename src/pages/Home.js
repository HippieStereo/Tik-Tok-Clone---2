import FollowersColumn from "../components/FollowersColumn";
import axios from "axios";
import {useEffect, useState} from "react";
import Card from "../components/Card";
import MiniCard from "../components/MiniCard";

const Home = () => {

    const [users, setUsers] = useState();
    const [userToToggle, setUserToToggle] = useState();
    let descendingUsers;
    let topFiveFollowing;
    let topFiveNotFollowing;

    const addData = async () => {

        await axios.post('/.netlify/functions/AddData',
            {headers: {'Content-Type': 'application/json'}}
            );

    }

    const fetchData = async () => {

        const results = await axios.get(
            '/.netlify/functions/Posts',
            {headers: {'Content-Type': 'application/json'}}
            );

        setUsers(results.data);

    }

    //toggle user from followed to unfollowed
    if (userToToggle) {
        const newValue = userToToggle.is_followed ? false : true
        const data = {is_followed: newValue}

        axios.put('/.netlify/functions/Edit', {userId: userToToggle.id, data: data })
            .then(json => console.log(json))
            .catch(err => console.error('error:' + err))
            .then(() => fetchData());

        setUserToToggle(null);

        fetchData();
    }

    useEffect(() => {
        addData();
        fetchData();
    }, []);

    if (users){
        descendingUsers = Object.values(users[1]).sort((a,b) => a.id < b.id ? 1 : -1);

        const following = Object.values(users[1]).filter(user => user.is_followed);
        const descendingFollowing = following.sort((a,b) => a.likes < b.likes ? 1 : -1);
        topFiveFollowing = descendingFollowing.slice(0,5);

        const notFollowing = Object.values(users[1]).filter(user => user.is_followed === false);
        const descendingNotFollowing = notFollowing.sort((a,b) => a.likes < b.likes ? 1 : -1);
        topFiveNotFollowing = descendingNotFollowing.slice(0,5);
    }

    return (
        <>
            <div className='container'>
               <FollowersColumn users={topFiveFollowing}/>
                {descendingUsers && (
                   <div className='feed'>
                       {descendingUsers.map((descendingUser, index) => (
                           <Card
                               key={index}
                               user={descendingUser}
                               toggleFollow={userToToggle => setUserToToggle(userToToggle)}
                           />
                       ))}
                    </div>
                )}
                <div className="suggested-box">
                    <div className="section">
                        <div className="suggested">
                            <h2 className="bold">Suggested accounts</h2>
                            <div className="break" />
                            {topFiveNotFollowing && topFiveNotFollowing.map((notFollowingUser, index) => (
                                <MiniCard
                                    key={index}
                                    user={notFollowingUser}
                                    toggleFollow={userToToggle => setUserToToggle(userToToggle)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
