import React from 'react';
import { shallow } from 'enzyme';
import Emoji from '../src/EmojiComponent';
import { DATA_PROP, VALID_EMOJIS } from './mocks';

describe('EmojiComponent', () => {
  const [[hexcode, unicode, shortcode, emoticon]] = VALID_EMOJIS;
  const shortcodes = ':enraged:, :pout:';

  it('errors if no emoticon, shortcode or unicode', () => {
    expect(() => shallow(<Emoji emojiData={DATA_PROP} />))
      .toThrowError('Emoji component requires a `unicode` character, `emoticon`, or a `shortcode`.');
  });

  it('returns value for invalid emoticon', () => {
    const wrapper = shallow(<Emoji emojiData={DATA_PROP} emoticon="0P" />);

    expect(wrapper.prop('children')).toBe('0P');
  });

  it('returns value for invalid shortcode', () => {
    const wrapper = shallow(<Emoji emojiData={DATA_PROP} shortcode="fake" />);

    expect(wrapper.prop('children')).toBe('fake');
  });

  it('returns empty for invalid unicode', () => {
    const wrapper = shallow(<Emoji emojiData={DATA_PROP} unicode="fake" />);

    expect(wrapper.prop('children')).toBe('fake');
  });

  it('renders with only the emoticon', () => {
    const wrapper = shallow(<Emoji emojiData={DATA_PROP} emoticon={emoticon} />);

    expect(wrapper.prop('data-emoticon')).toBe(emoticon);
    expect(wrapper.prop('data-unicode')).toBe(unicode);
    expect(wrapper.prop('data-hexcode')).toBe(hexcode);
    expect(wrapper.prop('data-shortcodes')).toBe(shortcodes);
  });

  it('renders with only the shortcode', () => {
    const wrapper = shallow(<Emoji emojiData={DATA_PROP} shortcode={shortcode} />);

    expect(wrapper.prop('data-emoticon')).toBe(emoticon);
    expect(wrapper.prop('data-unicode')).toBe(unicode);
    expect(wrapper.prop('data-hexcode')).toBe(hexcode);
    expect(wrapper.prop('data-shortcodes')).toBe(shortcodes);
  });

  it('renders with only the unicode', () => {
    const wrapper = shallow(<Emoji emojiData={DATA_PROP} unicode={unicode} />);

    expect(wrapper.prop('data-emoticon')).toBe(emoticon);
    expect(wrapper.prop('data-unicode')).toBe(unicode);
    expect(wrapper.prop('data-hexcode')).toBe(hexcode);
    expect(wrapper.prop('data-shortcodes')).toBe(shortcodes);
  });

  it('renders with both', () => {
    const wrapper = shallow(
      <Emoji
        emojiData={DATA_PROP}
        shortcode={shortcode}
        unicode={unicode}
      />,
    );

    expect(wrapper.prop('data-unicode')).toBe(unicode);
    expect(wrapper.prop('data-hexcode')).toBe(hexcode);
    expect(wrapper.prop('data-shortcodes')).toBe(shortcodes);
  });

  it('can define the path', () => {
    const wrapper = shallow((
      <Emoji
        emojiData={DATA_PROP}
        shortcode={shortcode}
        unicode={unicode}
        emojiPath="http://foo.com/path/to/{{hexcode}}.svg"
      />
    ));

    expect(wrapper.find('img').prop('alt')).toBe(unicode);
    expect(wrapper.find('img').prop('src')).toBe(`http://foo.com/path/to/${hexcode}.svg`);
  });

  it('can define the path with a function', () => {
    const wrapper = shallow((
      <Emoji
        emojiData={DATA_PROP}
        shortcode={shortcode}
        unicode={unicode}
        emojiPath={hex => `http://foo.com/path/to/${hex.toLowerCase()}.svg`}
      />
    ));

    expect(wrapper.find('img').prop('alt')).toBe(unicode);
    expect(wrapper.find('img').prop('src')).toBe(`http://foo.com/path/to/${hexcode.toLowerCase()}.svg`);
  });

  it('path function receives enlarge and size', () => {
    const wrapper = shallow((
      <Emoji
        emojiData={DATA_PROP}
        shortcode={shortcode}
        unicode={unicode}
        emojiPath={(hex, large, size) => (
          `http://foo.com/path/to/${large ? (size * 2) : size}/${hex.toLowerCase()}.svg`
        )}
        emojiSize={2}
        enlargeEmoji
      />
    ));

    expect(wrapper.find('img').prop('src')).toBe(`http://foo.com/path/to/4/${hexcode.toLowerCase()}.svg`);
  });

  it('adds class names', () => {
    const wrapper = shallow(
      <Emoji
        emojiData={DATA_PROP}
        shortcode={shortcode}
        unicode={unicode}
      />,
    );

    expect(wrapper.prop('className')).toBe('interweave__emoji');

    wrapper.setProps({
      enlargeEmoji: true,
    });

    expect(wrapper.prop('className')).toBe('interweave__emoji interweave__emoji--large');
  });

  it('sets styles when size is defined', () => {
    const wrapper = shallow(
      <Emoji
        emojiData={DATA_PROP}
        shortcode={shortcode}
        unicode={unicode}
      />,
    );

    expect(wrapper.prop('style')).toEqual({
      display: 'inline-block',
      verticalAlign: 'middle',
    });

    wrapper.setProps({
      emojiSize: 1,
    });

    expect(wrapper.prop('style')).toEqual({
      display: 'inline-block',
      verticalAlign: 'middle',
      width: 1,
      height: 1,
    });

    wrapper.setProps({
      emojiSize: 1,
      enlargeEmoji: true,
    });

    expect(wrapper.prop('style')).toEqual({
      display: 'inline-block',
      verticalAlign: 'middle',
      width: '3em',
      height: '3em',
    });
  });

  it('sets large size when base size is a string', () => {
    const wrapper = shallow((
      <Emoji
        emojiData={DATA_PROP}
        unicode={unicode}
        emojiSize="2em"
        enlargeEmoji
      />
    ));

    expect(wrapper.prop('style')).toEqual({
      display: 'inline-block',
      verticalAlign: 'middle',
      width: '6em',
      height: '6em',
    });
  });

  it('can customize large size', () => {
    const wrapper = shallow((
      <Emoji
        emojiData={DATA_PROP}
        shortcode={shortcode}
        unicode={unicode}
        emojiSize={2}
        emojiLargeSize={5}
        enlargeEmoji
      />
    ));

    expect(wrapper.prop('style')).toEqual({
      display: 'inline-block',
      verticalAlign: 'middle',
      width: 5,
      height: 5,
    });
  });

  it('can use string sizes', () => {
    const wrapper = shallow((
      <Emoji
        emojiData={DATA_PROP}
        shortcode={shortcode}
        unicode={unicode}
        emojiSize="2em"
      />
    ));

    expect(wrapper.prop('style')).toEqual({
      display: 'inline-block',
      verticalAlign: 'middle',
      width: '2em',
      height: '2em',
    });
  });
});