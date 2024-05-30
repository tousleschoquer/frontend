import React, { useState, useEffect } from 'react';
import { Typography, Box, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import HeadsetIcon from '@mui/icons-material/Headset';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import axios from 'axios';
import { useProfile } from '../../hooks/useProfile'; 

const AdminManageAccountsPage = () => {
  const [users, setUsers] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editUser, setEditUser] = useState({ userId: null, field: '', value: '' });
  const [changeRoleDialogOpen, setChangeRoleDialogOpen] = useState(false);
  const [selectedUserForRoleChange, setSelectedUserForRoleChange] = useState(null);
  const { profile } = useProfile();

  useEffect(() => {
    if (!profile || !profile.admin) {
      // Si l'utilisateur n'est pas administrateur, redirigez-le ou affichez un message d'accès refusé
      console.log('Access denied for user:', profile);
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/user'); // URL du backend pour récupérer tous les utilisateurs
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [profile]);

  if (!profile || !profile.admin) {
    // Affichez un message d'accès refusé si l'utilisateur n'est pas administrateur
    return (
      <div>
        <Header />
        <Box sx={{ padding: 2 }}>
          <Typography variant="h4">Accès refusé</Typography>
          <Typography variant="body1">Vous devez être connecté en tant qu'administrateur pour accéder à cette page.</Typography>
        </Box>
        <Footer />
      </div>
    );
  }

  const handleDeleteUserDialogOpen = (userId) => {
    setSelectedUserId(userId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/user/${selectedUserId}`); // URL du backend pour supprimer un utilisateur par son ID
      setUsers(users.filter(user => user._id !== selectedUserId));
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };


  const handleEditDialogOpen = (userId) => {
    setEditUser({ userId, field: '', value: '' });
    setEditDialogOpen(true);
  };

  const handleEditUserChange = (field, value) => {
    setEditUser({ ...editUser, [field]: value });
  };

  const handleEditUserSave = async () => {
    try {
      await axios.put(`http://localhost:4000/api/user/${editUser.userId}`, { [editUser.field]: editUser.value }); // URL du backend pour mettre à jour un utilisateur
      setUsers(users.map(user => user._id === editUser.userId ? { ...user, [editUser.field]: editUser.value } : user));
      setEditDialogOpen(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleRoleChangeDialogOpen = (userId) => {
    setSelectedUserForRoleChange(userId);
    setChangeRoleDialogOpen(true);
  };

  const handleChangeUserRole = async () => {
    try {
      const selectedUser = users.find(user => user._id === selectedUserForRoleChange);
      if (!selectedUser.admin) { // Vérifier que l'utilisateur n'est pas déjà administrateur
        const updatedUser = await axios.put(`http://localhost:4000/api/user/${selectedUserForRoleChange}`, { admin: true }); // URL du backend pour changer le rôle d'un utilisateur
        setUsers(users.map(user => user._id === selectedUserForRoleChange ? updatedUser.data : user));
        setChangeRoleDialogOpen(false);
      } else {
        console.log('User is already an admin.');
      }
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };
  

  return (
    <div>
      <Header />
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" mb={3}>Gérer les comptes utilisateur</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'white' }}>Identifiant</TableCell>
                <TableCell sx={{ color: 'white' }}>E-mail</TableCell>
                <TableCell sx={{ color: 'white' }}>Mot de passe</TableCell>
                <TableCell sx={{ color: 'white' }}>Admin</TableCell>
                <TableCell sx={{ color: 'white' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow key={user._id}>
                  <TableCell sx={{ color: 'white' }}>{user.username}</TableCell>
                  <TableCell sx={{ color: 'white' }}>{user.email}</TableCell>
                  <TableCell sx={{ color: 'white' }}>{user.password}</TableCell>
                  <TableCell sx={{ color: 'white' }}>{user.admin ? 'True' : 'False'}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDeleteUserDialogOpen(user._id)}><DeleteIcon sx={{ color: 'white' }} /></IconButton>
                    <IconButton onClick={() => handleEditDialogOpen(user._id)}><EditIcon sx={{ color: 'white' }} /></IconButton>
                    <IconButton onClick={() => handleRoleChangeDialogOpen(user._id)}>
                      <HeadsetIcon sx={{ color: 'white' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Footer />

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Êtes-vous sûr de vouloir supprimer ce compte utilisateur ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Annuler</Button>
          <Button onClick={handleDeleteUser} variant="contained" color="error">Supprimer</Button>
        </DialogActions>
      </Dialog>


      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Éditer le compte utilisateur</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Choisissez le champ à éditer :</Typography>
          <TextField
            select
            label="Champ"
            value={editUser.field}
            onChange={(e) => handleEditUserChange('field', e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="username">Identifiant</MenuItem>
            <MenuItem value="password">Mot de passe</MenuItem>
          </TextField>
          {editUser.field && (
            <TextField
              label={editUser.field === 'username' ? 'Nouvel identifiant' : 'Nouveau mot de passe'}
              value={editUser.value}
              onChange={(e) => handleEditUserChange('value', e.target.value)}
              fullWidth
              margin="normal"
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Annuler</Button>
          <Button onClick={handleEditUserSave} variant="contained" color="primary">Enregistrer</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={changeRoleDialogOpen} onClose={() => setChangeRoleDialogOpen(false)}>
        <DialogTitle>Changer le rôle de l'utilisateur</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Êtes-vous sûr de vouloir {users.find(user => user._id === selectedUserForRoleChange)?.admin ? 'révoquer le rôle d\'administrateur' : 'accorder le rôle d\'administrateur'} à cet utilisateur ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setChangeRoleDialogOpen(false)}>Annuler</Button>
          <Button onClick={handleChangeUserRole} variant="contained" color="primary">
            {users.find(user => user._id === selectedUserForRoleChange)?.admin ? 'Révoquer' : 'Accorder'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminManageAccountsPage;
