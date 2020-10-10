import chalk from 'chalk';
import moment from 'moment';
import util from 'util';

export class Logger {
    public static log(
        content: any,
        { color, label } = { color: 'grey', label: 'Log' }
    ): void {
        Logger.write(content, { color, label });
    }

    public static info(
        content: any,
        { color, label } = { color: 'green', label: 'Info' }
    ): void {
        Logger.write(content, { color, label });
    }

    public static error(
        content: any,
        { color, label } = { color: 'red', label: 'Error' }
    ): void {
        Logger.write(content, { color, label, error: true });
    }

    public static write(
        content: any,
        { color, label, error }: LoggerOptions
    ): void {
        const timestamp = `[${moment().format('YYYY-MM-DD HH:mm:ss')}]`;
        const tag = `[${label}]`;
        const text =
            typeof content === 'string'
                ? content
                : util.inspect(content, { depth: 3 });
        const stream = error ? process.stderr : process.stdout;
        const item = '{ts}|{tg}'
            .replace('{ts}', chalk.cyan(timestamp))
            .replace('{tg}', chalk.bold(tag))
            .concat(' '.repeat(6 - label!.length))
            .concat((chalk as any)[color!](text), '\n');
        stream.write(item);
    }
}

interface LoggerOptions {
    color?: string;
    label?: string;
    error?: boolean;
}