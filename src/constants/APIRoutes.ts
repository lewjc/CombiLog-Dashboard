export default {
	aggregator: {
		ADD_SERVICE: "/api/service/add",
		ADD_BULK: "/api/service/bulk-add",
		GET_ALL_SERVICES: "/api/service/all",
	},
	archiver: {
		GET_FILE_STRUCTURE: "/api/file/structure",
		GET_HOT_FILE: "/api/file/hot/{logName}",
		GET_SERVICE_FILE: "/api/file/{serviceName}/{logName}",
		GET_ARCHIVE_FILE: "/api/file/archive/{logName}",
	},
};
