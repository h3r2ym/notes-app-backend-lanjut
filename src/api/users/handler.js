const autoBind = require('auto-bind');

class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  async postUserHandler(request, h) {
    this._validator.validateUserPayload(request.payload);
    const { username, password, fullname } = request.payload;

    const userId = await this._service.addUser({
      username,
      password,
      fullname,
    });

    const response = h.response({
      status: 'success',
      message: 'User berhasil ditambahkan',
      data: {
        userId,
      },
    });

    response.code(201);

    return response;
  }

  async getUserByIdHandler(request) {
    const { id } = request.params;
    const user = await this._service.getUserById(id);

    return {
      status: 'success',
      data: {
        user,
      },
    };
  }

  // async getNotesHandler() {
  //   const notes = await this._service.getNotes();
  //   return {
  //     status: 'success',
  //     data: {
  //       notes,
  //     },
  //   };
  // }

  // async getNoteByIdHandler(request) {
  //   const { id } = request.params;

  //   const note = await this._service.getNoteById(id);
  //   return {
  //     status: 'success',
  //     data: {
  //       note,
  //     },
  //   };
  // }

  // async putNoteByIdHandler(request) {
  //   this._validator.validateNotePayload(request.payload);
  //   const { id } = request.params;

  //   await this._service.editNoteById(id, request.payload);

  //   return {
  //     status: 'success',
  //     message: 'Catatan berhasil diperbarui',
  //   };
  // }

  // async deleteNoteByIdHandler(request) {
  //   const { id } = request.params;

  //   await this._service.deleteNoteById(id);

  //   return {
  //     status: 'success',
  //     message: 'Catatan berhasil dihapus',
  //   };
  // }
}

module.exports = UsersHandler;
