import {
    CardContent,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Divider,
    Button,
    CircularProgress,
    Box,
    Menu,
    Typography,
    Card,
    CardHeader,
} from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ChevronDown from "mdi-material-ui/ChevronDown";


const PresentasePK = ({ data }) => {
    const rows = [
        ['Nilai Tugas', 'tugas'],
        ['Nilai UTS', 'uts'],
        ['Nilai UAS', 'uas'],
        ['Nilai Praktek', 'praktek']
    ]

    return (
        <Grid container sx={{ marginBottom: '30px' }}>
            {
                rows.map((row) => (
                    <Grid item xl={3} lg={6} sm={12} xs={12}>
                        <Card variant="outlined" sx={{ margin: '10px', backgroundColor: '#526D82' }}>
                            <CardHeader
                                title={row[0]}
                                titleTypographyProps={{ variant: 'h1', color: 'white' }}
                            />
                            <CardContent sx={{ color: 'white', fontSize: '20px' }}>
                                {data['nilai_' + row[1]]}
                            </CardContent>
                        </Card>
                    </Grid>
                ))
            }
        </Grid>
    )
}

export default PresentasePK