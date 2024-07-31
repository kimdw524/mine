package com.mine.application.avatar.command.domain.voice;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.UUID;

final class Base64AndFileConverter {

    private static final String filePath = "./temp/tempVoice/";

    static File base64ToFile(Base64FileUploadRequest request) {
        byte[] binary = Base64.getDecoder().decode(request.getFile());

        File target = new File(filePath + fileNameConvert(request.getFileName(), request.getFileExtension()));
        target.getParentFile().mkdirs();
        try {
            target.createNewFile();
            target.setReadable(true);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }


        try(FileOutputStream fos = new FileOutputStream(target)) {
            fos.write(binary);
        }catch (IOException e) {
            throw new RuntimeException(e);
        }

        return target;
    }

    void removeFile(File file) {
        file.delete();
    }

    private static String fileNameConvert(String fileName, String extension) {
        StringBuilder sb = new StringBuilder();
        UUID uuid = UUID.randomUUID();

        sb.append(uuid).append("-").append(fileName).append(".").append(extension);
        return sb.toString();
    }
}
