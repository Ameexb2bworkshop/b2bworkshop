import React from "react";
import { css } from "styled-components";
import Button, { ButtonPresentationProps } from "@insite/mobius/Button";
import translate from "@insite/client-framework/Translate";
import GridContainer, { GridContainerProps } from "@insite/mobius/GridContainer";
import GridItem, { GridItemProps } from "@insite/mobius/GridItem";
import TextField, { TextFieldProps } from "@insite/mobius/TextField";
import addWishList from "@insite/client-framework/Store/Pages/MyLists/Handlers/AddWishList";
import updateWishList from "@insite/client-framework/Store/Pages/MyListDetails/Handlers/UpdateWishList";
import { ResolveThunks, connect } from "react-redux";
import { WishListModel } from "@insite/client-framework/Types/ApiModels";
import siteMessage from "@insite/client-framework/SiteMessage";
import ToasterContext from "@insite/mobius/Toast/ToasterContext";

interface OwnProps {
    wishList?: WishListModel;
    onCancel: () => void;
    onSubmit: () => void;
}

interface State {
    name: string;
    nameError?: React.ReactNode;
    description: string;
}

const mapDispatchToProps = {
    addWishList,
    updateWishList,
};

type Props = OwnProps & ResolveThunks<typeof mapDispatchToProps>;

export interface MyListsEditListFormStyles {
    container?: GridContainerProps;
    nameGridItem?: GridItemProps;
    nameTextField?: TextFieldProps;
    descriptionGridItem?: GridItemProps;
    descriptionTextField?: TextFieldProps;
    buttonsGridItem?: GridItemProps;
    cancelButton?: ButtonPresentationProps;
    createButton?: ButtonPresentationProps;
}

const styles: MyListsEditListFormStyles = {
    nameGridItem: {
        width: 12,
    },
    descriptionGridItem: {
        width: 12,
    },
    buttonsGridItem: {
        width: 12,
        css: css` justify-content: flex-end; `,
    },
    cancelButton: {
        color: "secondary",
        css: css` margin-right: 10px; `,
    },
};

export const createListFormStyles = styles;

class MyListsEditListForm extends React.Component<Props, State> {
    static contextType = ToasterContext;
    context!: React.ContextType<typeof ToasterContext>;

    constructor(props: Props) {
        super(props);
        this.state = {
            name: props.wishList?.name || "",
            description: props.wishList?.description || "",
        };
    }

    submitHandler = (e: any) => {
        if (this.state.name === "") {
            this.setState({ nameError: siteMessage("Lists_Enter_New_Wishlist_Name") });
            return;
        }

        if (this.props.wishList) {
            this.props.updateWishList({
                apiParameter: { wishListId: this.props.wishList.id, name: this.state.name, description: this.state.description },
                onSuccess: this.onSubmitSuccess,
                onError: this.onSubmitError,
            });
        } else {
            this.props.addWishList({
                apiParameter: { name: this.state.name, description: this.state.description },
                onSuccess: this.onSubmitSuccess,
                onError: this.onSubmitError,
                reloadWishLists: true,
            });
        }
    };

    onSubmitSuccess = () => {
        this.context.addToast({ body: translate(`List ${this.props.wishList ? "Updated" : "Created"}`), messageType: "success" });
        this.props.onSubmit();
    };

    onSubmitError = (errorMessage: string) => {
        this.setState({ nameError: errorMessage });
    };

    nameChangeHandler = (e: any) => {
        this.setState({
            name: e.target.value,
            nameError: "",
        });
    };

    descriptionChangeHandler = (e: any) => {
        this.setState({
            description: e.target.value,
        });
    };

    render() {
        return (
            <GridContainer {...styles.container}>
                <GridItem {...styles.nameGridItem}>
                    <TextField
                        data-test-selector="myListsEditListFormName"
                        label={translate("List Name")}
                        {...styles.nameTextField}
                        name="name"
                        error={this.state.nameError}
                        required
                        defaultValue={this.state.name}
                        onChange={this.nameChangeHandler}>
                    </TextField>
                </GridItem>
                <GridItem {...styles.descriptionGridItem}>
                    <TextField
                        data-test-selector="myListsEditListFormDescription"
                        label={translate("Description")}
                        {...styles.descriptionTextField}
                        name="description"
                        defaultValue={this.state.description}
                        onChange={this.descriptionChangeHandler}>
                    </TextField>
                </GridItem>
                <GridItem {...styles.buttonsGridItem}>
                    <Button
                        {...styles.cancelButton}
                        onClick={this.props.onCancel}>
                        {translate("Cancel")}
                    </Button>
                    <Button {...styles.createButton} onClick={this.submitHandler} data-test-selector="myListsEditListFormSubmit">
                        {translate(this.props.wishList ? "Save" : "Create List")}
                    </Button>
                </GridItem>
            </GridContainer>
        );
    }
}

export default connect(null, mapDispatchToProps)(MyListsEditListForm);