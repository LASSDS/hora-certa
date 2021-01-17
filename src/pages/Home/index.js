import React, { useState, useEffect }  from 'react';
import { ptBR } from 'date-fns/locale'
import { format, utcToZonedTime } from 'date-fns-tz';
import timezones from '../../utils/timezones-list';

import './styles.css';

export default function Home(){
    const defaultTimeZone = 'America/Bahia';
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [timeZone, setTimeZone] = useState(defaultTimeZone);
    const [locale, setLocale] = useState(ptBR);    
    const urlCreator = 'https://github.com/LASSDS';    
    
    useEffect(() => {
        const interval = setInterval(() => {
            let newDateTime;
            let hours;
            let minutes;
            let seconds;
            let dt;
            let concatTime;
            
            newDateTime = utcToZonedTime(new Date(), timeZone);        
            
            hours = format(newDateTime, 'HH');
            minutes = format(newDateTime, 'mm');
            seconds = format(newDateTime, 'ss');
            dt = format(newDateTime, "EEEE, dd 'de' MMMM 'de' yyyy", { locale })
    
            concatTime = hours+':'+minutes+':'+seconds;
            setTime(concatTime);
            
            
            if(dt !== date){
                setDate(dt);
            }

        },1000);  

        return () => clearInterval(interval);      
    },[date, timeZone, locale]);    
            

    function onChangeTimeZone(tmz){

        if(tmz !== timeZone){
            setTimeZone(tmz);
        }
    }

    return (        
        <div id="container">
            <div id="main">
                <header>
                    <h1>
                        Hora Certa
                    </h1>
                    <h2>
                        Acerte o seu relógio com o Hora Certa
                    </h2>
                </header>
                <div id="content">
                    <h3 id="day">{date}</h3>
                    <p id="watch">{time}</p>
                    
                    <h3 id="select-text">Escolha o seu fuso-horário:</h3>
                    <select
                        id="select-timeZone"
                        defaultValue={defaultTimeZone}
                        onChange={(e) => onChangeTimeZone(e.target.value)}    
                    >
                        {timezones.map(timezone => (
                            
                            <option 
                                key={timezone.tzCode}
                                value={timezone.tzCode}
                            >
                                {timezone.label}
                            </option>
                                        
                        ))}
                    </select>
                </div>
                <footer>
                    <p>
                        Criado por <a href={urlCreator}>Leonardo Anjos</a> - 2021
                    </p>
                </footer>
            </div>  
        </div>
    );
}