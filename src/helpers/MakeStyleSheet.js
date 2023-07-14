import { makeStyles } from "@material-ui/core/styles";

export default class MakeStyleSheet {
    static useStyles = makeStyles((theme) => ({
        autoCompleteRenderOptions: {
            fontSize: '14px',
            fontWeight: 'normal',
            color: 'grey',
            fontFamily: 'Scg',
        },
        autoCompleteInputLabel: {
            fontSize: '14px',
            fontWeight: 'normal',
            color: 'grey',
            fontFamily: 'Scg',
        },
        autoCompleteInputHelperText: {
            fontSize: '12.8px',
            fontWeight: 'normal',
            color:' #e55353',
            fontFamily: 'Scg',
        },
        root: {
            backgroundColor: theme.palette.background.paper,
            width: '100%',

        },
        appBar: {
            position: 'relative',
            backgroundColor: '#056776',


        },
        tabRoot: {
            fontFamily: 'Scg',
            fontWeight: 'normal',
            color: 'black ',
            backgroundColor: '#056776'
        },
        PrivateTabIndicator : {

        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
        input:{

            fontFamily: 'Scg',
            fontWeight: 'normal',
            color: 'black ',

        },
        label:{

            fontFamily: 'Scg',
            fontWeight: 'normal',
            color: 'grey ',

        },
        comboOptions: {
            fontSize: '14px',
            fontWeight: 'normal',
            color: 'grey ',
            fontFamily: 'Scg',



        },
       
    }));
}