import { FormEvent, useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { nanoid } from "nanoid";
import { Equation } from "../interfaces";
import { Operation } from "../operations";
import "./Calculator.css";

const Calculator = () => {
    const [equation, setEquation] = useState<Equation>({
        firstNumber: "",
        secondNumber: "",
        operation: "",
        output: "",
        id: "",
        createdAt: 0,
    });
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const output = calculate(Number(equation.firstNumber), Number(equation.secondNumber), equation.operation);
        const id = nanoid();
        const createdAt = Date.now();
        const attributesToUpdate = { output, id, createdAt };
        await setDoc(doc(db, "calculations", id), { ...equation, ...attributesToUpdate });
        setEquation((prevEquation) => ({ ...prevEquation, ...attributesToUpdate }));
    };
    const handleChange = async (e: FormEvent<HTMLInputElement>) => {
        const { name: key, value } = e.currentTarget;
        setEquation((prevEquation) => ({ ...prevEquation, [key]: value }));
    };
    const calculate = (firstNumber: number, secondNumber: number, operation: string): number | string => {
        switch (operation) {
            case Operation.Addition:
                return firstNumber + secondNumber;
            case Operation.Subtraction:
                return firstNumber - secondNumber;
            case Operation.Multiplication:
                return firstNumber * secondNumber;
            case Operation.Division:
                if (secondNumber === 0) return "Nie można dzielić przez 0";
                return firstNumber / secondNumber;
            default:
                return "";
        }
    };
    // Ze względu na bardzo mały rozmiar aplikacji nie wydzielałem inputów do osobnych komponentów.
    return (
        <div className='calculator-wrapper'>
            <form className='calculator' onSubmit={handleSubmit}>
                <div className='calculator__input-wrapper'>
                    <label htmlFor='firstNumber'>Pierwsza liczba</label>
                    <input
                        id='firstNumber'
                        className='calculator__input'
                        value={equation.firstNumber}
                        onChange={handleChange}
                        name='firstNumber'
                        type={"number"}
                    />
                </div>
                <div className='calculator__input-wrapper'>
                    <label htmlFor='secondNumber'>Druga Liczba</label>
                    <input
                        id='secondNumber'
                        className='calculator__input'
                        value={equation.secondNumber}
                        onChange={handleChange}
                        name='secondNumber'
                        type={"number"}
                    />
                </div>

                <div className='calculator__operations'>
                    <p className='calculator__text'>Działanie</p>
                    <div className='calculator__operations-wrapper'>
                        <div className='calculator__radio-wrapper'>
                            <input
                                onChange={handleChange}
                                id='addition'
                                name='operation'
                                value='addition'
                                type='radio'
                                checked={equation.operation === "addition"}
                                required
                            />
                            <label htmlFor='addition'>Dodaj</label>
                        </div>
                        <div className='calculator__radio-wrapper'>
                            <input
                                onChange={handleChange}
                                id='subtraction'
                                name='operation'
                                value='subtraction'
                                type='radio'
                                checked={equation.operation === "subtraction"}
                                required
                            />
                            <label htmlFor='subtraction'>Odejmij</label>
                        </div>
                        <div className='calculator__radio-wrapper'>
                            <input
                                onChange={handleChange}
                                id='multiplication'
                                name='operation'
                                value='multiplication'
                                type='radio'
                                checked={equation.operation === "multiplication"}
                                required
                            />
                            <label htmlFor='multiplication'>Pomnóż</label>
                        </div>
                        <div className='calculator__radio-wrapper'>
                            <input
                                onChange={handleChange}
                                id='division'
                                name='operation'
                                value='division'
                                type='radio'
                                checked={equation.operation === "division"}
                                required
                            />
                            <label htmlFor='division'>Podziel</label>
                        </div>
                    </div>
                </div>
                <button className='calculator__button' type='submit'>
                    Oblicz
                </button>
            </form>
            <p className='calculator__output'>Wynik to: {equation.output}</p>
        </div>
    );
};

export default Calculator;
