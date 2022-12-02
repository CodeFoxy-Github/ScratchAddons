import { BlockShape, BlockInstance, BlockInputEnum, BlockInputBoolean, BlockInputBlock } from "./BlockTypeInfo.js";

const SVG_NS = "http://www.w3.org/2000/svg";

const BlockShapes = {
  // eg (my variable)
  Round: {
    padding: 12,
    minWidth: 20,
    backgroundPath: (width) => `m -12 -20 m 20 0 h ${width - 16} a 20 20 0 0 1 0 40 H 8 a 20 20 0 0 1 0 -40 z`,

    snugglePadding: 0,
    get snuggleWith() {
      // Don't feel bad BlockShapes.Round, I only snuggle with myself too :_(
      return [BlockShapes.Round];
    },
  },

  // eg <() = ()>
  Boolean: {
    padding: 20,
    minWidth: 20,
    backgroundPath: (width) => `m -20 -20 m 20 0 h ${width} l 20 20 l -20 20 H 0 l -20 -20 l 20 -20 z`,

    snugglePadding: 0,
    get snuggleWith() {
      return [BlockShapes.Boolean];
    },
  },

  // eg show
  Stack: {
    padding: 8,
    minWidth: 60,
    backgroundPath: (width) =>
      `m -8 -20 A 4 4 0 0 1 -4 -24 H 4 c 2 0 3 1 4 2 l 4 4 c 1 1 2 2 4 2 h 12 c 2 0 3 -1 4 -2 l 4 -4 C 37 -23 38 -24 40 -24 H ${width} a 4 4 0 0 1 4 4 v 40 a 4 4 0 0 1 -4 4 H 40 c -2 0 -3 1 -4 2 l -4 4 c -1 1 -2 2 -4 2 h -12 c -2 0 -3 -1 -4 -2 l -4 -4 c -1 -1 -2 -2 -4 -2 H -4 a 4 4 0 0 1 -4 -4 z`,
  },

  // eg when I start as a clone
  Hat: {
    padding: 8,
    minWidth: 60,
    backgroundPath: (width) =>
      `m -8 -20 A 4 4 0 0 1 -4 -24 H ${width} a 4 4 0 0 1 4 4 v 40 a 4 4 0 0 1 -4 4 H 40 c -2 0 -3 1 -4 2 l -4 4 c -1 1 -2 2 -4 2 h -12 c -2 0 -3 -1 -4 -2 l -4 -4 c -1 -1 -2 -2 -4 -2 H -4 a 4 4 0 0 1 -4 -4 z`,
  },

  // eg delete this clone
  End: {
    padding: 8,
    minWidth: 60,
    backgroundPath: (width) =>
      `m -8 -20 A 4 4 0 0 1 -4 -24 H 4 c 2 0 3 1 4 2 l 4 4 c 1 1 2 2 4 2 h 12 c 2 0 3 -1 4 -2 l 4 -4 C 37 -23 38 -24 40 -24 H ${width} a 4 4 0 0 1 4 4 v 40 a 4 4 0 0 1 -4 4 H -4 a 4 4 0 0 1 -4 -4 z`,
  },

  /*

M -8 -20 a 4 4 0 0 1 4 -4 H 60 a 4 4 0 0 1 4 4 v 2 c 0 2 -1 3 -2 4 l -4 4 c -1 1 -2 2 -2 4 v 12 c 0 2 1 3 2 4 l 4 4 c 1 1 2 2 2 4 v 2 a 4 4 0 0 1 -4 4 H -4 a 4 4 0 0 1 -4 -4 v -2 c 0 -2 -1 -3 -2 -4 l -4 -4 c -1 -1 -2 -2 -2 -4 v -12 c 0 -2 1 -3 2 -4 l 4 -4 c 1 -1 2 -2 2 -4 z
M -6 -22 a 2 2 0 0 1 2 -2 h 60 a 2 2 0 0 1 2 2 v 4 c 0 2 -1 3 -2 4 l -4 4 c -1 1 -2 2 -2 4 v 12 c 0 2 1 3 2 4 l 4 4 c 1 1 2 2 2 4 v 4 a 2 2 0 0 1 -2 2 H -4 a 2 2 0 0 1 -2 -2 v -4 c 0 -2 -1 -3 -2 -4 l -4 -4 c -1 -1 -2 -2 -2 -4 v -12 c 0 -2 1 -3 2 -4 l 4 -4 c 1 -1 2 -2 2 -4 z
  */

  // The white oval for text or number inputs
  TextInput: {
    padding: 12,
    minWidth: 16,
    backgroundPath: (width) => `m -12 -16 m 16 0 h ${width - 8} a 16 16 0 0 1 0 32 H 4 a 16 16 0 0 1 0 -32 z`,

    snugglePadding: 4,
    get snuggleWith() {
      return [BlockShapes.Round];
    },
  },

  BooleanInput: {
    padding: 16,
    minWidth: 16,
    backgroundPath: (width) => `m 0 -16 h ${width} l 16 16 l -16 16 h -16 l -16 -16 l 16 -16 z`,

    snugglePadding: 6,
    get snuggleWith() {
      return [BlockShapes.Boolean];
    },
  },

  HorizontalBlock: {
    padding: 16,
    minWidth: 45,
    backgroundPath: (width) =>
      `M -4 -20 a 4 4 0 0 1 4 -4 H ${
        width + 8
      } a 4 4 0 0 1 4 4 v 2 c 0 2 -1 3 -2 4 l -4 4 c -1 1 -2 2 -2 4 v 12 c 0 2 1 3 2 4 l 4 4 c 1 1 2 2 2 4 v 2 a 4 4 0 0 1 -4 4 H 0 a 4 4 0 0 1 -4 -4 v -2 c 0 -2 -1 -3 -2 -4 l -4 -4 c -1 -1 -2 -2 -2 -4 v -12 c 0 -2 1 -3 2 -4 l 4 -4 c 1 -1 2 -2 2 -4 z`,
  },
};

/**
 * Gets the block shape info from {@link BlockShapes} given a {@link BlockShape}.
 * @param {BlockShape} shape
 */
function getShapeInfo(shape, isVertical) {
  if (shape === BlockShape.Round) return BlockShapes.Round;
  if (shape === BlockShape.Boolean) return BlockShapes.Boolean;
  if (shape === BlockShape.Stack) return isVertical ? BlockShapes.Stack : BlockShapes.HorizontalBlock;
  if (shape === BlockShape.Hat) return BlockShapes.Hat;
  if (shape === BlockShape.End) return BlockShapes.End;
  throw new Error(shape);
}

const BLOCK_ELEMENT_SPACING = 8;

/**
 * A part of a block. Think of these like the different parts in the 'make a block' menu.
 */
class BlockComponent {
  constructor(element, padding, width, snuggleWith, snugglePadding) {
    this.dom = element;
    this.padding = padding;
    this._width = width;
    this.snuggleWith = snuggleWith;
    this.snugglePadding = snugglePadding;
  }

  get width() {
    if (this._width) return this._width;
    this._width = this.dom.getBoundingClientRect().width + this.padding * 2;
    return this._width;
  }

  set width(value) {
    this._width = value;
  }
}

/**
 * Creates a BlockComponent with some text. Like the 'label' element in the make a block menu.
 * @param {string} text The contents of the component.
 * @returns {BlockComponent} The BlockComponent.
 */
function createTextComponent(text) {
  let textElement = document.createElementNS(SVG_NS, "text");
  textElement.setAttribute("class", "blocklyText");
  textElement.setAttribute("dominant-baseline", "middle");
  textElement.setAttribute("dy", 1);
  textElement.appendChild(document.createTextNode(text));
  return new BlockComponent(textElement, 0);
}

/**
 * Creates a DOM element to hold all the contents of a block.
 * A block could be the top level block, or it could be a block like (() + ()) that's inside
 * another block.
 * @returns {SVGElement} The SVGElement which will contain all the block's components.
 */
function createBlockContainer() {
  let container = document.createElementNS(SVG_NS, "g");
  let background = document.createElementNS(SVG_NS, "path");
  background.setAttribute("class", "blocklyPath");
  container.appendChild(background);
  return container;
}

/**
 * Creates a block component from a container containing all it's components.
 * @param {SVGElement} container The block container, created by {@link createBlockContainer}.
 * @param {object} shape An object containing information of the shape of the block to be created. From the {@link BlockShapes} object.
 * @param {string} fillCategory The category of the block, used for filling the background.
 * @param {string} strokeCategory The category of the parnet block, used for the outline.
 * @param {number} width The width of the background of the block.
 * @param {string} fillColorType Type of colour from the category to fill the background with. "primary", "secondary" or "tertiary"
 */
function createBlockComponent(container, shape, fillCategory, strokeCategory, width, fillColorType = "primary") {
  if (width < shape.minWidth) width = shape.minWidth;
  const background = container.children[0];
  let style = "";
  if (fillCategory) style += `fill: var(--sa-block-background-${fillColorType}-${fillCategory});`;
  if (strokeCategory) style += `stroke: var(--sa-block-background-tertiary-${strokeCategory});`;
  background.setAttribute("style", style);
  background.setAttribute("d", shape.backgroundPath(width));
  return new BlockComponent(
    container,
    shape.padding,
    width + shape.padding * 2,
    shape.snuggleWith,
    shape.snugglePadding
  );
}

function createBackedTextedComponent(text, container, shape, fillCategory, strokeCategory, fillColorType) {
  const blockContainer = createBlockContainer();
  container.appendChild(blockContainer);
  const textElement = createTextComponent(text);
  blockContainer.appendChild(textElement.dom);
  if (textElement.width < shape.minWidth) {
    textElement.dom.setAttribute("x", (shape.minWidth - textElement.width) / 2);
  }

  const blockElement = createBlockComponent(
    blockContainer,
    shape,
    fillCategory,
    strokeCategory,
    textElement.width,
    fillColorType
  );
  return blockElement;
}

/**
 * Renders a block, with the center of it's leftmost side located at 0, 0.
 * @param {BlockInstance} block
 * @param {SVGElement} container
 */
export default function renderBlock(block, container) {
  var blockComponent = _renderBlock(block, container, block.typeInfo.category, true);
  blockComponent.dom.classList.add("sa-block-color-all");
  blockComponent.dom.setAttribute("transform", `translate(${blockComponent.padding}, 0)`);
  return blockComponent.dom;
}

/**
 * Renders a block, with the center of it's leftmost side located at 0, 0.
 * @param {BlockInstance} block
 * @param {SVGAElement} container
 * @param {string} parentCategory The category of this blocks parnet. If no parent, than this blocks category.
 * @returns {BlockComponent} The rendered component.
 */
function _renderBlock(block, container, parentCategory, isVertical) {
  const blockContainer = container.appendChild(createBlockContainer());
  const shape = getShapeInfo(block.typeInfo.shape, isVertical);

  let xOffset = 0;
  let inputIdx = 0;

  for (let partIdx = 0; partIdx < block.typeInfo.parts.length; partIdx++) {
    const blockPart = block.typeInfo.parts[partIdx];

    let component;
    if (typeof blockPart === "string") {
      component = createTextComponent(blockPart);
      blockContainer.appendChild(component.dom);
    } else {
      const blockInput = block.inputs[inputIdx++];
      if (blockInput instanceof BlockInstance) {
        component = _renderBlock(blockInput, blockContainer, block.typeInfo.category, false);
      } else if (blockPart instanceof BlockInputEnum) {
        component = createBackedTextedComponent(
          blockInput?.string ?? "",
          blockContainer,
          BlockShapes.TextInput,
          block.typeInfo.category,
          block.typeInfo.category,
          "secondary"
        );
      } else if (blockPart instanceof BlockInputBoolean) {
        component = createBackedTextedComponent(
          "",
          blockContainer,
          BlockShapes.BooleanInput,
          block.typeInfo.category,
          block.typeInfo.category,
          "tertiary"
        );
      } else if (blockPart instanceof BlockInputBlock) {
        component = createBackedTextedComponent(
          "",
          blockContainer,
          BlockShapes.HorizontalBlock,
          block.typeInfo.category,
          block.typeInfo.category,
          "tertiary"
        );
      } else {
        component = createBackedTextedComponent(
          blockInput?.toString() ?? "",
          blockContainer,
          BlockShapes.TextInput,
          null,
          block.typeInfo.category
        );
        component.dom.children[0].setAttribute("fill", "#fff"); // TODO Style?
        component.dom.classList.add("blocklyNonEditableText");
      }
    }

    let xTranslation = xOffset + component.padding;

    if (partIdx === 0 || partIdx === block.typeInfo.parts.length - 1) {
      if (component.snuggleWith && component.snuggleWith.indexOf(shape) !== -1) {
        const positionDelta = component.snugglePadding - component.padding;
        component.width += positionDelta;

        if (partIdx === 0) {
          xTranslation += positionDelta;
        }
      }
    }

    component.dom.setAttribute("transform", `translate(${xTranslation}, 0)`);
    xOffset += BLOCK_ELEMENT_SPACING + component.width;
  }

  return createBlockComponent(
    blockContainer,
    shape,
    block.typeInfo.category,
    parentCategory,
    xOffset - BLOCK_ELEMENT_SPACING
  );
}