import React from 'react';
import { Agent } from '../../interfaces/agent';

interface AgentListProps {
  agents: Agent[];
  onSelectAgent: (agent: Agent) => void;
}

export const AgentList: React.FC<AgentListProps> = ({
  agents,
  onSelectAgent,
}) => {
  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {agents.map((agent, index) => (
        <div key={agent.id}>
          <div 
            className="flex justify-between items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => onSelectAgent(agent)}
          >
            <div className="space-y-1">
              <h3 className="text-lg font-medium">{agent.name}</h3>
              <p className="text-sm text-gray-500">{agent.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {agent.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded ${getStatusColor(agent.status)}`}>
                {agent.status}
              </span>
            </div>
          </div>
          {index < agents.length - 1 && <div className="border-t border-gray-200" />}
        </div>
      ))}
    </div>
  );
}; 