import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const variantText = {
    'on-sale': 'Sale',
    'new-release': 'Just Released!' 
  }

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price variant={variant}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {salePrice > 0 && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
        </Row>
        {variant !== 'default' && <Variant variant={variant}>{variantText[variant]}</Variant>}
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 370px;
`;

const ImageWrapper = styled.div`
  border-radius: 16px 16px 4px 4px;
  overflow: hidden;
  position: relative;
`;

const Image = styled.img`
  /* fix gap at bottom of image */
  margin-bottom: -10px;
  object-fit: cover;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  font-size: 1rem;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: ${p => p.variant === 'on-sale' && COLORS.gray[700]};
  text-decoration: ${p => p.variant === 'on-sale' && 'line-through'};
  text-decoration-color: ${COLORS.gray[700]};
  `;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const Variant = styled.span`
  background-color: ${p => p.variant === 'on-sale' ? COLORS.primary : COLORS.secondary};
  border-radius: 2px;
  color: white;
  font-weight: 700;
  padding: 6px 9px;
  position: absolute;
  right: -1%;
  top: 5%;
`

export default ShoeCard;
