import React from 'react';
import { FileDropZone, Button } from '../common';
import type { SelectedFiles } from '../../types';
import styles from './FileUploadSection.module.css';

interface FileUploadSectionProps {
  selectedFiles: SelectedFiles;
  onFilesSelected: (files: FileList) => void;
  onLoad: () => void;
  canLoad: boolean;
  isLoading: boolean;
  loadingMessage: string;
}

const FileUploadSection: React.FC<FileUploadSectionProps> = ({
  selectedFiles,
  onFilesSelected,
  onLoad,
  canLoad,
  isLoading,
  loadingMessage,
}) => {
  const getFileStatus = (file: File | null, required: boolean) => {
    if (file) {
      return { text: `✓ ${file.name}`, className: styles.loaded };
    }
    return required
      ? { text: '필요', className: styles.missing }
      : { text: '선택사항', className: styles.optional };
  };

  const fileItems = [
    { key: 'combined', name: 'combined_input.jsonl', type: '필수', file: selectedFiles.combined, required: true },
    { key: 'results', name: 'results.jsonl', type: '필수', file: selectedFiles.results, required: true },
    { key: 'unitKnowledge', name: 'unitKnowledge.json', type: '필수', file: selectedFiles.unitKnowledge, required: true },
    { key: 'criteria', name: 'criteria.jsonl', type: '선택', file: selectedFiles.criteria, required: false },
  ];

  return (
    <div className={styles.container}>
      <h3>파일 업로드</h3>

      <FileDropZone onFilesSelected={onFilesSelected} />

      <div className={styles.fileList}>
        {fileItems.map((item) => {
          const status = getFileStatus(item.file, item.required);
          return (
            <div key={item.key} className={styles.fileItem}>
              <div className={styles.fileName}>{item.name}</div>
              <div className={styles.fileType}>{item.type}</div>
              <div className={`${styles.fileStatus} ${status.className}`}>{status.text}</div>
            </div>
          );
        })}
      </div>

      {isLoading && <div className={styles.loading}>{loadingMessage}</div>}

      <div className={styles.loadButtonContainer}>
        <Button variant="primary" onClick={onLoad} disabled={!canLoad || isLoading}>
          데이터 로드하기
        </Button>
      </div>
    </div>
  );
};

export default FileUploadSection;
