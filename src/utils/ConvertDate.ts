
class ConvertDate {

    ConverterData( dataISO: string = 'aaaa-mm-ddThh:mm:ss.000Z'):string{
    // A data passada deve estar no padrão:
    // YYYY-MM-DDThh:mm:ss.000Z
        // Primeiro, dividimos a data completa em duas partes:
        const [date, time] = dataISO.split('T');
    
        // Dividimos a data em dia, mês e ano:
        const [YYYY, MM, DD] = date.split('-');
    
        // Dividimos o tempo em hora e minutos:
        // eslint-disable-next-line
        const [HH, mm, ss] = time.split(':');
    
        // Retornamos a data formatada em um padrão compatível com ISO:
        return `${DD}/${MM}/${YYYY}`;
    }

    //export default ConvertDate;


    bissexto(ano:number){
        if(ano % 4 === 0 && (ano % 100 !== 0 || ano % 400 === 0)){
        return 1;
        }else{
        return 0;
        }
    }

    validarData(d:number, m:number, a:number){
        if (d < 1 || d > 31 || m < 1 || m > 12){
            return 0;
        }if (d === 31 && (m === 4 || m === 6 || m === 9 || m === 11)){
            return 0;
        }if (m === 2 && d > 29){
            return 0;
        }if (m === 2 && d === 29 && this.bissexto(a) === 0){
            return 0;
        }return 1;
    }

    diasNoMes(m:number, a:number){
        if(m === 1 || m === 3 || m === 5 || m === 7 || m === 8 || m === 10 || m === 12){
        return 31;
        }else{
        if(m === 4 || m === 6 || m === 9 || m === 11){
            return 30;
        }else{
            if(this.bissexto(a) === 1){
            return 29;
            }else{
            return 28;
            }
        }
        }
    }

    CalcularIdade(dataISO: string = 'aaaa-mm-ddThh:mm:ss.000Z'):string{
        
        const dataConvertida = this.ConverterData(dataISO);
        const [dnSTR, mnSTR, anSTR] = dataConvertida.split('/');

        let dn = Number(dnSTR);
        let mn = Number(mnSTR);
        let an = Number(anSTR);

        let qtdDia = 0; 
        let qtdMes = 0; 
        let qtdAno = 0;

        const date = new Date();
        const da = date.getDate();
        const ma = date.getMonth() + 1; 
        const aa = date.getFullYear();

        while(mn < ma - 1 || an < aa){
        mn++
        qtdMes++
        if(qtdMes === 12){
            qtdMes = 0
            qtdAno++
        }

        if(mn === 12){
            an++
            mn = 0
        }
        }
        // ajustes para o último mes
        if(dn === da){
        qtdMes++
        qtdDia = 0
        }
        else if(dn < da){
        qtdMes++
        qtdDia = da - dn
        }
        else{
        qtdDia = this.diasNoMes(ma - 1, aa) + da - dn
        }
        return `${qtdAno}a ${qtdMes}m ${qtdDia}d`;
    }

    FormataStringData(data:string) {
        let cvtdata = "";
         cvtdata  += data.split("/")[2];
         cvtdata  += "-"+ data.split("/")[1];
         cvtdata  += "-"+ data.split("/")[0];
         return cvtdata;
       }
}

export {ConvertDate};
//export default {ConvertDate, CalcularIdade};