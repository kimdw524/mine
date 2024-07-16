import { useEffect, useState } from "react";

interface Result {
    id: string;
    firstName: string;
    lastName: string;
}

function App() {
    const [result, setResult] = useState<Result>({
        id: "",
        firstName: "",
        lastName: "",
    });

    useEffect(() => {
        // mocking 한 데이터가 옴
        fetch("http://localhost:3000/user")
            .then((res) => res.json())
            .then((res) => setResult({ ...res }));
    }, []);

    return (
        <>
            <div>{result.id}</div>
            <div>{result.firstName}</div>
            <div>{result.lastName}</div>
        </>
    );
}

export default App;
