import { cn } from './index';

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', 'visible')).toBe('base visible');
  });

  it('merges tailwind classes and resolves conflicts', () => {
    expect(cn('px-4 py-2', 'px-8')).toBe('py-2 px-8');
  });

  it('handles empty inputs', () => {
    expect(cn()).toBe('');
  });
});
