export function toBase64(file: File){
    const fileBase64 = new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    return fileBase64;
}

export const getFormData = (name: string, base64: any, identification: string) => {
    let contentFileBase64 = base64.split(",")[1];

    return {
        contentBase64: contentFileBase64,
        identification: identification
    };
};

/*const cargaArchivoSoporte = async (event) => {
    const file = event.target.files;
    if(file) {
        const fileObje = event.currentTarget.files[0];
        let validSize = fileObje.size <= 10485760;
        if(validSize){
            forEach(file, async fileObject => {
                const nombreArchivo = fileObject.name;
                const extension = nombreArchivo.split(".").pop();
                forEach(extensionesInvalidas, invalidExt => {
                    if (isEqual(invalidExt, extension)) {
                        setGrabarNombreArchivo(nombreArchivo);
                        setActivarAlertaExt(true);
                        fileObject = null;
                    }
                });
                if (fileObject !== null) {
                    const fileBase64 = await toBase64(fileObject);
                    dispatch({
                        type: SET_FILES,
                        payload: {
                            id: uuids(),
                            nombre: fileObject.name,
                            tamano: fileObject.size,
                            archivo: fileBase64
                        }
                    });
                }
            });
        }else{
            ToastNotification.error(`El tamaño del archivo (${(fileObje.size / 1048576)
                .toPrecision(4)} MB)
                                            supera el límite de 10 MB`)
        }
    }
}*/