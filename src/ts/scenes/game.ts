import * as logger from 'js-logger';

import { canvasColor } from '../config/game.config';
import { BUSINESSES_GUI, SIDEMENU_GUI } from '../config/gui.config';
import { BUSINESS_INFO, BUSINESS_OPERATIONS, BusinessOperation, STARTING_MONEY } from '../config/business.config';

import { BaseBusiness } from '../classes/BaseBusiness';

const {
  buttonWidth,
  buttonHeight,
  buttonOffsetX,
  buttonOffsetY,
  buttonGap,
  buttonColor,
  buttonAlpha,
  buttonOriginX,
  buttonOriginY,
  buttonFont,
  buttonFontFill,
  borderWidth,
  menuBgColor,
  menuBgAlpha,
  menuX,
  menuY,
  menuHeight,
  menuWidth,
} = SIDEMENU_GUI;

const {
  businessTitleFont,
  businessFont,
  logoSize,
  logoDefaultAlpha,
  nameOffsetY,
  moneyIndicatorX,
  moneyIndicatorY,
  moneyIndicatorTitle,
  moneyIndicatorFont,
  statsOffsetX,
  statsOffsetY,
  progressBarHeight,
  progressBarWidth,
  progressBarBorderColor,
  progressBarBorderAlpha,
  operationOffsetX,
  operationOffsetY,
  operationLogoSize
} = BUSINESSES_GUI;

export default class Game extends Phaser.Scene {
  private background: Phaser.GameObjects.Image;
  private graphics: Phaser.GameObjects.Graphics;
  private totalMoneyIndicator: Phaser.GameObjects.Text;

  private totalMoney = STARTING_MONEY;
  private businesses: BaseBusiness[] = [];
  private businessIndicators: { [name: string]: Phaser.GameObjects.Image } = {};
  private menuOptions: string[] = [
    'Managers',
    'Upgrades',
    'Stock market',
  ];

  create(): void {
    logger.info('Game enter');

    this.graphics = this.add.graphics();

    this.setBackground();
    this.setSideMenu();
    this.createMoneyIndicator();
    this.createBusinesses();
    this.createBusinessLogos();
    this.createBusinessOptions();
    this.createBusinessStats();
  }

  update() {
    this.businesses.forEach((business: BaseBusiness) => business.update());

    this.totalMoneyIndicator.text = this.totalMoney.toFixed(2);
  }

  private setBackground(): void {
    this.cameras.main.setBackgroundColor(canvasColor);

    this.background = this.add.image(
      (this.sys.game.config.width as number) / 2,
      (this.sys.game.config.height as number) / 2,
      'bg'
    );

    this.background.alpha = 0.05;
  }

  private setSideMenu(): void {
    this.graphics.lineStyle(borderWidth, menuBgColor, menuBgAlpha);
    this.graphics.fillStyle(menuBgColor, menuBgAlpha);
    this.graphics.fillRect(menuX, menuY, menuWidth, menuHeight);

    this.menuOptions.forEach((option, i) => {
      const position = {
        x: buttonOffsetX,
        y: buttonOffsetY + (i * buttonGap)
      };

      this.graphics.fillStyle(buttonColor, buttonAlpha);
      this.graphics.fillRoundedRect(position.x, position.y, buttonWidth, buttonHeight);

      const text = this.add.text(
        position.x + (buttonWidth / 2),
        position.y + (buttonHeight / 2),
        option,
        {
          font: buttonFont,
          fill: buttonFontFill
        }
      );

      text.setOrigin(buttonOriginX, buttonOriginY);
    });
  }

  private createMoneyIndicator(): void {
    this.add.text(
      moneyIndicatorX,
      moneyIndicatorY,
      moneyIndicatorTitle,
      moneyIndicatorFont
    );

    this.totalMoneyIndicator = this.add.text(
      moneyIndicatorX + 150,
      moneyIndicatorY,
      STARTING_MONEY.toString(),
      moneyIndicatorFont
    );
  }

  private createBusinesses(): void {
    BUSINESS_INFO.forEach((business, index: number) => {
      this.businesses.push(new business.model(
        business.name,
        business.price,
        business.profit,
        business.interval,
        this.add.image( 0, 0, business.logo),
        index
      ));
    });
  }

  private createBusinessLogos(): void {
    this.businesses.forEach((business: BaseBusiness) => {
      business.logo.setPosition(business.positionX, business.positionY);

      business.logo.alpha = logoDefaultAlpha;
      business.logo.setInteractive();
      business.logo.on(
        'pointerup',
        () => this.totalMoney = business.onClick(this.totalMoney)
      );

      business.logo.displayHeight = logoSize;
      business.logo.scaleX = business.logo.scaleY;
    });
  }

  private createBusinessOptions(): void {
    this.businesses.forEach((business: BaseBusiness) => {
      BUSINESS_OPERATIONS.forEach((businessOperation: BusinessOperation, index: number) => {
        const operation = this.add.image(
          business.positionX - operationOffsetX,
          business.positionY - logoSize / 2 + operationOffsetY * index,
          businessOperation.logo
        );

        operation.setInteractive();
        operation.on(
          'pointerup',
          // @ts-ignore
          () => this.totalMoney = [businessOperation.operationName](this.totalMoney)
        );

        operation.displayHeight = operationLogoSize;
        operation.scaleX = operation.scaleY;
      });
    });
  }

  private createBusinessStats(): void {
    this.businesses.forEach((business: BaseBusiness) => {
      const stats = {
        name: this.add.text(
          business.positionX - (logoSize / 2),
          business.positionY - nameOffsetY,
          business.name,
          businessTitleFont
        ),
        profit: this.add.text(
          business.positionX + statsOffsetX,
          business.positionY,
          `Profit: ${business.profit}`,
          businessFont
        ),
        interval: this.add.text(
          business.positionX + statsOffsetX,
          business.positionY + statsOffsetY,
          `Remaining: ${business.interval}`,
          businessFont
        ),
        price: this.add.text(
          business.positionX + statsOffsetX,
          business.positionY + (2 * statsOffsetY),
          `Price: ${ business.price.toString()}`,
          businessFont
        ),
        progress: this.graphics.fillRect(
          business.positionX + statsOffsetX,
          business.positionY - statsOffsetY,
          progressBarWidth,
          progressBarHeight,
         )
      };

      this.graphics.lineStyle(borderWidth, progressBarBorderColor, progressBarBorderAlpha);
      this.graphics.strokeRect(
        business.positionX + statsOffsetX,
        business.positionY - statsOffsetY,
        progressBarWidth + 1,
        progressBarHeight + 1,
      );

      business.graphicStats = stats;
    });
  }
}
