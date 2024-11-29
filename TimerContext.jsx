import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
    const [timer60, setTimer60] = useState(3600); // 60 minutes in seconds
    const [timerStarted, setTimerStarted] = useState(false); // Timer start state
    const [isActivated, setIsActivated] = useState(false); // Check if timer is activated

    // Load timers from AsyncStorage on component mount
    useEffect(() => {
        const loadTimers = async () => {
            try {
                const savedTimer60 = await AsyncStorage.getItem('timer60');
                const savedTimerStarted = await AsyncStorage.getItem('timerStarted');
                if (savedTimer60 !== null && savedTimerStarted !== null) {
                    setTimer60(parseInt(savedTimer60));
                    setTimerStarted(savedTimerStarted === 'true');
                    // setIsActivated(savedTimerStarted === 'true');
                }
            } catch (error) {
                console.error('Error loading timers from AsyncStorage:', error);
            }
        };
        loadTimers();
    }, []);

    // Save timers to AsyncStorage when they change
    useEffect(() => {
        const saveTimers = async () => {
            try {
                await AsyncStorage.setItem('timer60', timer60.toString());
                await AsyncStorage.setItem('timerStarted', timerStarted.toString());
            } catch (error) {
                console.error('Error saving timers to AsyncStorage:', error);
            }
        };
        saveTimers();
    }, [timer60, timerStarted]);

    // Start and stop timers
    useEffect(() => {
        let interval;
        if (timerStarted && isActivated) {
            interval = setInterval(() => {
                if (timer60 > 0) {
                    setTimer60(prevTimer => prevTimer - 1);
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timerStarted, timer60, isActivated]);


    return (
        <TimerContext.Provider value={{ timer60, setTimer60, timerStarted, setTimerStarted, isActivated, setIsActivated }}>
            {children}
        </TimerContext.Provider>
    );
};

export const useTimer = () => useContext(TimerContext);
