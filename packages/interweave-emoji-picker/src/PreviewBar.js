/**
 * @copyright   2016, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 * @flow
 */

import React from 'react';
import PropTypes from 'prop-types';
import EmojiCharacter from 'interweave/lib/components/Emoji';
import { EmojiShape, EmojiPathShape } from './shapes';

import type { Emoji, EmojiPath } from './types';

type PreviewBarProps = {
  emoji: ?Emoji,
  emojiPath: EmojiPath,
  hideShortcodes: boolean,
};

export default class PreviewBar extends React.PureComponent<PreviewBarProps> {
  static contextTypes = {
    messages: PropTypes.objectOf(PropTypes.string),
  };

  static propTypes = {
    emoji: EmojiShape,
    emojiPath: EmojiPathShape.isRequired,
    hideShortcodes: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    emoji: null,
  };

  formatAnnotation(annotation: string): string {
    return annotation
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  render() {
    const { emoji, emojiPath, hideShortcodes } = this.props;

    if (!emoji) {
      return (
        <div className="iep__preview iep__preview--empty">
          {this.context.messages['no-preview']}
        </div>
      );
    }

    return (
      <div className="iep__preview">
        <div className="iep__preview-emoji">
          <EmojiCharacter
            unicode={emoji.emoji || emoji.text}
            emojiPath={emojiPath}
            emojiLargeSize={2.5}
            enlargeEmoji
          />
        </div>

        <div className="iep__preview-content">
          {emoji.annotation && (
            <div className="iep__preview-name">
              {this.formatAnnotation(emoji.annotation)}
            </div>
          )}

          {!hideShortcodes && emoji.canonical_shortcodes && (
            <div className="iep__preview-shortcodes">
              {emoji.canonical_shortcodes.join(' ')}
            </div>
          )}
        </div>
      </div>
    );
  }
}