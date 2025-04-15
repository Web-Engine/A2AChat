import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { MCPServer } from '../../models/mcp';

interface MCPInstallFormProps {
  onSubmit: (server: Omit<MCPServer, 'id' | 'status' | 'lastStartedAt' | 'lastStoppedAt'>) => void;
  onCancel: () => void;
}

export const MCPInstallForm: React.FC<MCPInstallFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    version: '1.0.0',
    config: {
      port: 8080,
      host: 'localhost',
      maxConnections: 100,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <Input
            label="서버 이름"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="MCP 서버 이름을 입력하세요"
            required
          />

          <Input
            label="버전"
            value={formData.version}
            onChange={(e) => setFormData({ ...formData, version: e.target.value })}
            placeholder="서버 버전을 입력하세요"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="포트"
              type="number"
              value={formData.config.port}
              onChange={(e) => setFormData({
                ...formData,
                config: { ...formData.config, port: parseInt(e.target.value) }
              })}
              required
            />

            <Input
              label="호스트"
              value={formData.config.host}
              onChange={(e) => setFormData({
                ...formData,
                config: { ...formData.config, host: e.target.value }
              })}
              required
            />
          </div>

          <Input
            label="최대 연결 수"
            type="number"
            value={formData.config.maxConnections}
            onChange={(e) => setFormData({
              ...formData,
              config: { ...formData.config, maxConnections: parseInt(e.target.value) }
            })}
            required
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-600"
          >
            취소
          </Button>
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600"
          >
            설치
          </Button>
        </div>
      </form>
    </Card>
  );
}; 