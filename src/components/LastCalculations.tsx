import { useState, useEffect } from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Equation } from "../interfaces";
import { Operation } from "../operations";

const LastEquations = () => {
    const wordToSymbol = (operation: string): string => {
        switch (operation) {
            case Operation.Addition:
                return "+";
            case Operation.Subtraction:
                return "-";
            case Operation.Division:
                return "/";
            case Operation.Multiplication:
                return "*";
            default:
                return operation;
        }
    };
    const [equations, setEquations] = useState([] as Array<Equation>);
    useEffect(() => {
        const getFromDB = async () => {
            const querySnapshot = await getDocs(collection(db, "calculations"));
            const result = [] as Array<Equation>;
            querySnapshot.forEach((item) => {
                result.push(item.data() as Equation);
            });
            setEquations(result);
        };
        getFromDB();
    }, []);
    return (
        <div>
            {equations.length > 0 &&
                equations.map((equation) => {
                    {
                        console.log(equation);
                    }
                    return (
                        <p key={equation.id}>
                            <span>{equation.firstNumber}</span>
                            <span>{wordToSymbol(equation.operation)}</span>
                            <span>{equation.secondNumber}</span>
                            <span>=</span>
                            <span>{equation.output}</span>
                        </p>
                    );
                })}
        </div>
    );
};

export default LastEquations;
