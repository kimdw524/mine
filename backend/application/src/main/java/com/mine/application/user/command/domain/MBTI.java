package com.mine.application.user.command.domain;

import lombok.Setter;

@Setter
public class MBTI {
    private Energy energy;
    private Information information;
    private DecisionMaking decisionMaking;
    private LifeStyle lifeStyle;

    public enum Energy {
        E, I
    }

    public enum Information {
        S, N
    }

    public enum DecisionMaking {
        T, F
    }

    public enum LifeStyle {
        J, P
    }

    public MBTI(Energy energy, Information information, DecisionMaking decisionMaking, LifeStyle lifeStyle) {
        this.energy = energy;
        this.information = information;
        this.decisionMaking = decisionMaking;
        this.lifeStyle = lifeStyle;
    }

    private MBTI(String mbti) {
        this.energy = Energy.valueOf(mbti.substring(0, 1));
        this.information = Information.valueOf(mbti.substring(1, 2));
        this.decisionMaking = DecisionMaking.valueOf(mbti.substring(2, 3));
        this.lifeStyle = LifeStyle.valueOf(mbti.substring(3, 4));
    }


    public Energy getEnergy() {
        return energy;
    }

    public Information getInformation() {
        return information;
    }

    public DecisionMaking getDecisionMaking() {
        return decisionMaking;
    }

    public LifeStyle getLifeStyle() {
        return lifeStyle;
    }

    @Override
    public String toString() {
        char[] chars = new char[4];
        chars[0] = energy.toString().charAt(0);
        chars[1] = information.toString().charAt(0);
        chars[2] = decisionMaking.toString().charAt(0);
        chars[3] = lifeStyle.toString().charAt(0);
        return new String(chars);
    }

    public static MBTI of(String mbti) {
        return new MBTI(mbti);
    }

}
