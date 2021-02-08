export default {
  aggregator: {
    ADD_SERVICE: "/api/service/add",
    ADD_BULK: "/api/service/bulk-add",
    GET_ALL_SERVICES: "/api/service/all",
    ADD_COLOUR_RULE: "/api/setting/add-colour-rule",
    EDIT_COLOUR_RULE: "/api/setting/edit-colour-rule",
    GET_SETTINGS: "/api/setting/all",
    GET_COLOUR_RULES: "/api/setting/colour-rules",
    DELETE_COLOUR_RULE: "/api/setting/colour-rules/{name}",
  },
  archiver: {
    GET_FILE_STRUCTURE: "/api/file/structure",
    GET_HOT_FILE: "/api/file/hot/{logName}",
    GET_SERVICE_FILE: "/api/file/{serviceName}/{logName}",
    GET_ARCHIVE_FILE: "/api/file/archive/{logName}",
  },
};
