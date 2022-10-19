import axios from "axios";
import {useEffect, useState} from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {Grid, Stack, Button} from "@mui/material"
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import {useSelect} from "@mui/base";
import {useDispatch, useSelector} from "react-redux";
import {setData} from "../../redux/features/productsSlice";
import Link from "next/link";

 const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'desc', headerName: 'Description', width: 130 },
    {
        field: 'price',
        headerName: 'Price',
        width: 90,
    },
     {
         field: 'action',
         headerName: 'Action',
         width: 180,
         renderCell: (params) => {
             const onClick = (e: any) => {
                 const currentRow = params.row;
                 return alert(JSON.stringify(currentRow, null, 4));
             };

             return (
                 <Stack direction="row" spacing={2}>
                     <Button variant="outlined" color="warning" size="small" onClick={onClick}>Edit</Button>
                     <Button variant="outlined" color="error" size="small">Delete</Button>
                 </Stack>
             );
         },
     }
];

const Dashboard = () => {
    const [progress, setProgress] = useState(true)
    const [messageAPI, setMessageAPI] = useState('')

    const productsRedux = useSelector((state: any) => state.products.data);
    const userLogin = useSelector((state: any) => state.login.user)

    const dispatch = useDispatch()

    const getProductAPI = async () => {
        let token: string|null = localStorage.getItem('token');
        // @ts-ignore
        return await axios.get('http://eshop-ecommert.herokuapp.com/api/products', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
    }

    const handleClose = () => {
        setProgress(false);
    };

    const handleToggle = () => {
        setProgress(!open);
    };

    useEffect(() => {
        getProductAPI().then((response) => {
            dispatch(setData(response.data.data))
            setProgress(false)
        }).catch(err => {
            console.log(err)})
    },[])

    return (
      <>
          <Link href="/"><a>Home</a></Link>
          <h2>Home page { userLogin.email}</h2>
          <Grid container justifyContent="center">
              <div style={{ height: 400, width: '80%' }}>
                      <DataGrid
                          rows={productsRedux}
                          columns={columns}
                          pageSize={5}
                          rowsPerPageOptions={[5]}
                          checkboxSelection
                          loading={!productsRedux.length}
                      />
              </div>
          </Grid>
      </>
  )
}

export default Dashboard;
