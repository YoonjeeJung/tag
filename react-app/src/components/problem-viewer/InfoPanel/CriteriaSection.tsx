import React from 'react';
import type { Criteria, UnitInfo } from '../../../types';
import { escapeHtml } from '../../../utils/dataUtils';
import styles from './CriteriaSection.module.css';

interface CriteriaSectionProps {
  criteria: Criteria[];
  unitsData: Record<number, UnitInfo>;
}

const CriteriaSection: React.FC<CriteriaSectionProps> = ({ criteria, unitsData }) => {
  if (!criteria || criteria.length === 0) {
    return null;
  }

  // category_base_name 중복 제거
  const categoryNames: string[] = [];
  const seenCategories = new Set<string>();
  criteria.forEach((item) => {
    if (item.category_base_name && !seenCategories.has(item.category_base_name)) {
      seenCategories.add(item.category_base_name);
      categoryNames.push(item.category_base_name);
    }
  });

  // unit_id별로 그룹화
  const unitGroups: Record<
    number,
    {
      unit_id: number;
      unit_name: string;
      curriculum_name: string;
      knowledges: { knowledge_id: number; knowledge_name: string; knowledge_checked: boolean }[];
    }
  > = {};

  criteria.forEach((item) => {
    const unitId = item.unit_id;
    if (!unitGroups[unitId]) {
      const unitInfo = unitsData[unitId] || {};
      unitGroups[unitId] = {
        unit_id: unitId,
        unit_name: unitInfo.unit_name || '알 수 없음',
        curriculum_name: unitInfo.curriculum_name || '알 수 없음',
        knowledges: [],
      };
    }

    // knowledge 추가 (중복 제거)
    const knowledgeExists = unitGroups[unitId].knowledges.some((k) => k.knowledge_id === item.knowledge_id);
    if (!knowledgeExists && item.knowledge_id) {
      unitGroups[unitId].knowledges.push({
        knowledge_id: item.knowledge_id,
        knowledge_name: item.knowledge_name,
        knowledge_checked: item.knowledge_checked || false,
      });
    }
  });

  return (
    <>
      {/* 통합 유형 섹션 */}
      {categoryNames.length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.purpleHeader}>통합 유형</h3>
          {categoryNames.map((name, idx) => (
            <div key={idx} className={styles.value}>
              {escapeHtml(name)}
            </div>
          ))}
        </div>
      )}

      {/* DB 기준 섹션 */}
      {Object.keys(unitGroups).length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.purpleHeader}>DB 기준</h3>
          {Object.values(unitGroups).map((unit) => (
            <div key={unit.unit_id} className={styles.unitCandidate}>
              <div className={styles.unitHeader}>
                <div className={styles.unitNameGroup}>
                  <span className={styles.unitName}>{escapeHtml(unit.unit_name)}</span>
                  <span className={styles.unitMeta}>{escapeHtml(unit.curriculum_name)}</span>
                </div>
              </div>

              {unit.knowledges.map((knowledge) => (
                <div key={knowledge.knowledge_id} className={styles.knowledgeItem}>
                  <div className={styles.knowledgeName}>
                    <span>{escapeHtml(knowledge.knowledge_name || '알 수 없음')}</span>
                    {knowledge.knowledge_checked && <span className={styles.checkedIcon}>✅</span>}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CriteriaSection;
