import React from 'react'
import { useTheme } from '@mui/system'
import ReactEcharts from 'echarts-for-react'
import { useState, useEffect, useContext } from "react";
import * as utils from 'app/utils/utils';
import { userContext } from "../../../contexts/user-context";

const DoughnutChart = ({ height, color = [] }) => {
    const theme = useTheme()
    const context = useContext(userContext);
    const initialDashboardData = [
        // {
        //     value: 0,
        //     name: 'Viaje',
        // },
        // {
        //     value: 0,
        //     name: 'Hogar',
        // },   
        // {
        //     value: 0,
        //     name: 'Pareja',
        // },
        // {
        //     value: 0,
        //     name: 'Comida',
        // },
        // {
        //     value: 1,
        //     name: 'Otro',
        // },
    ]
    const [dashboardData, setDashBoardData] = useState(initialDashboardData); 
    // const dummyData = [
    //     {
    //         value: 90,
    //         name: 'Google',
    //     },
    //     {
    //         value: 5,
    //         name: 'Facebook',
    //     },
    //     { value: 5, name: 'Others' },
    // ]

    useEffect(() => {
        async function fetchData() {
          // Se obtienen los datos básicos del gráfico
          const usuario = context.user_data;
          console.log("AuthContext:", usuario)
    
          const config = {
            method: "GET",
            headers: {
              Authorization: `Token ${context.token}`,
              "Content-type": "application/json",
            },
          };
    
          try {
            const response = await utils.verEventosActividadesParticipante(config);
            console.log("response:", response)

            if (!response.error) {
                // Se refinan los datos obtenidos antes de almacenarlos
                // En este caso vamos a contar cuantos eventos hay por cada tipo
                let count_viaje = 0;
                let count_hogar = 0;
                let count_pareja = 0;
                let count_comida = 0;
                let count_otro = 0;

                // Utilizamos un conjunto para realizar un seguimiento de los nombres únicos
                const actividades_participa = new Set();

                for(let i=0; i < response.actividades_en_que_participa.length; i++) {
                    // eventos tipo: 'VIAJE'
                    if (response.actividades_en_que_participa[i].evento_tipo === "VIAJE" && !actividades_participa.has(response.actividades_en_que_participa[i].evento)) { 
                        count_viaje++; 
                        actividades_participa.add(response.actividades_en_que_participa[i].evento)
                    }
                    // eventos tipo: 'HOGAR'
                    else if (response.actividades_en_que_participa[i].evento_tipo === "HOGAR" && !actividades_participa.has(response.actividades_en_que_participa[i].evento)) {
                        count_hogar++;
                        actividades_participa.add(response.actividades_en_que_participa[i].evento)
                    }
                    // eventos tipo: 'PAREJA'
                    else if (response.actividades_en_que_participa[i].evento_tipo === "PAREJA" && !actividades_participa.has(response.actividades_en_que_participa[i].evento)) {
                        count_pareja++;
                        actividades_participa.add(response.actividades_en_que_participa[i].evento)
                    }
                    // eventos tipo: 'COMIDA'
                    else if (response.actividades_en_que_participa[i].evento_tipo === "COMIDA" && !actividades_participa.has(response.actividades_en_que_participa[i].evento)) {
                        count_comida++;
                        actividades_participa.add(response.actividades_en_que_participa[i].evento)
                    }
                    // eventos tipo: 'OTRO'
                    else if (response.actividades_en_que_participa[i].evento_tipo === "OTRO" && !actividades_participa.has(response.actividades_en_que_participa[i].evento)) {
                        count_otro++;
                        actividades_participa.add(response.actividades_en_que_participa[i].evento)
                    }
                }
                let final_data = [
                    {
                        value: count_viaje,
                        name: 'Viaje',
                    },
                    {
                        value: count_hogar,
                        name: 'Hogar',
                    },
                    {
                        value: count_pareja,
                        name: 'Pareja',
                    },
                    {
                        value: count_comida,
                        name: 'Comida',
                    },
                    {
                        value: count_otro,
                        name: 'Otro',
                    },
                ]
                // Ahora guardamos los datos
                // Validamos si hay eventos en los que participa.
                if (count_viaje === 0 && count_hogar === 0 && count_pareja === 0 && count_comida === 0 && count_otro === 0) {
                        await setDashBoardData(initialDashboardData);    
                    }
                else {
                    await setDashBoardData(final_data);
                }
            }
            else {
                console.error("Error:", response.error);    
                await setDashBoardData(initialDashboardData)
            }
          } catch (error) {
            console.error("Error:", error);
          }
        }
        fetchData()
    });

    const option = {
        legend: {
            show: true,
            itemGap: 20,
            icon: 'circle',
            bottom: 0,
            textStyle: {
                color: theme.palette.text.secondary,
                fontSize: 13,
                fontFamily: 'roboto',
            },
        },
        tooltip: {
            show: false,
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        xAxis: [
            {
                axisLine: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
            },
        ],
        yAxis: [
            {
                axisLine: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
            },
        ],

        series: [
            {
                name: 'No data found!',
                type: 'pie',
                radius: ['45%', '72.55%'],
                center: ['50%', '43%'],
                avoidLabelOverlap: false,
                hoverOffset: 5,
                stillShowZeroSum: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center', // shows the description data to center, turn off to show in right side
                        textStyle: {
                            color: theme.palette.text.secondary,
                            fontSize: 13,
                            fontFamily: 'roboto',
                        },
                        formatter: '{a}',
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '14',
                            fontWeight: 'normal',
                            // color: "rgba(15, 21, 77, 1)"
                        },
                        formatter: '{b} \n{c} ({d}%)',
                    },
                },
                labelLine: {
                    normal: {
                        show: false,
                    },
                },
                data: dashboardData,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
    }

    return (
        <ReactEcharts
            style={{ height: height }}
            option={{
                ...option,
                // color: [...color],
                color: ['#FF6F61', '#6B4226', '#DAC292', '#5A5A5A', '#8AA29E'],
            }}
        />
    )
}

export default DoughnutChart
