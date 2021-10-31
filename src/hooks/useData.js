import { useEffect, useState } from "react";

const useData = () => {
    
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetch('https://sheltered-beach-92728.herokuapp.com/agents')
            .then(res => res.json())
            .then(data => {
                setAgents(data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    
    return {
        agents,
        loading
    }
}

export default useData;