/*
 * 代码参考 https://github.com/tonivj5/typeorm-naming-strategies
 */

import { DefaultNamingStrategy, NamingStrategyInterface } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';

export class SnakeNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
    name = 'SnakeName'; // 该策略的命名

    /**
     * 表名策略, 如果@Entity()里的name有自定义，那么按自定义
     * @param className
     * @param customName
     * @returns
     */
    tableName(className: string, customName: string): string {
        return customName || snakeCase(className);
    }

    /**
     * 字段名
     * @param propertyName
     * @param customName
     * @param embeddedPrefixes
     * @returns
     */
    columnName(propertyName: string, customName: string, embeddedPrefixes: string[]): string {
        return snakeCase(embeddedPrefixes.concat('').join('_')) + (customName ? customName : snakeCase(propertyName));
    }

    /**
     *
     * @param propertyName
     * @returns
     */
    relationName(propertyName: string): string {
        return snakeCase(propertyName);
    }

    /**
     *
     * @param relationName
     * @param referencedColumnName
     * @returns
     */
    joinColumnName(relationName: string, referencedColumnName: string): string {
        return snakeCase(relationName + '_' + referencedColumnName);
    }

    /**
     *
     * @param firstTableName
     * @param secondTableName
     * @returns
     */
    joinTableName(firstTableName: string, secondTableName: string): string {
        return snakeCase(firstTableName + '_' + secondTableName);
    }

    /**
     *
     * @param tableName
     * @param propertyName
     * @param columnName
     * @returns
     */
    joinTableColumnName(tableName: string, propertyName: string, columnName?: string): string {
        return snakeCase(tableName + '_' + (columnName ? columnName : propertyName));
    }

    /**
     *
     * @param parentTableName
     * @param parentTableIdPropertyName
     * @returns
     */
    classTableInheritanceParentColumnName(parentTableName: any, parentTableIdPropertyName: any): string {
        return snakeCase(parentTableName + '_' + parentTableIdPropertyName);
    }

    /**
     *
     * @param alias
     * @param propertyPath
     * @returns
     */
    eagerJoinRelationAlias(alias: string, propertyPath: string): string {
        return alias + '__' + propertyPath.replace('.', '_');
    }
}

export const snakeNamingStrategy = new SnakeNamingStrategy();
